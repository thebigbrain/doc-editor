import React from 'react';
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';
import { Button } from '@codesandbox/common/lib/components/Button';
import { logError } from '@codesandbox/common/lib/utils/analytics';

import { CardContainer, ErrorText, Label, StripeInput } from './elements';

interface Props {
  name: string;
  buttonName: string;
  loadingText: string;
  isLoading: boolean;
  subscribe: (params: { token: string; coupon: string }) => void;
  stripe?: ReactStripeElements.StripeProps;
  error?: Error | string;
  hasCoupon?: boolean;
}

interface State {
  errors: {
    name?: string;
    stripe?: string;
  };
  name: string;
  coupon: string;
  loading: boolean;
}

class CheckoutFormComponent extends React.PureComponent<Props, State> {
  state: State = {
    errors: {},
    name: this.props.name || '',
    coupon: '',
    loading: false,
  };
  setName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e) {
      this.setState({ errors: {}, name: e.target.value });
    }
  };
  setCoupon = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e) {
      this.setState({ errors: {}, coupon: e.target.value });
    }
  };
  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!this.state.name) {
      return this.setState({ errors: { name: 'Please provide a name ' } });
    }

    this.setState({ loading: true, errors: {} });

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    const { token, error } = await this.props.stripe.createToken({
      name: this.state.name,
    });
    if (error) {
      return this.setState({
        loading: false,
        errors: {
          stripe: error.message,
        },
      });
    }

    try {
      await this.props.subscribe({
        token: token.id,
        coupon: this.state.coupon,
      });
    } catch (err) {
      logError(err);

      return this.setState({
        loading: false,
        errors: {
          stripe: err.message,
        },
      });
    }

    return this.setState({
      loading: false,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    if (nextProps.name !== this.props.name) {
      this.setState({ errors: {}, name: nextProps.name });
    }
  }

  render() {
    const {
      buttonName,
      loadingText,
      isLoading,
      error,
      hasCoupon = false,
    } = this.props;
    const { errors, loading: stateLoading } = this.state;

    const loading = isLoading || stateLoading;

    const stripeError = errors.stripe || error;

    return (
      <form onSubmit={this.handleSubmit}>
        <Label>Cardholder Name</Label>
        {errors.name != null && <ErrorText>{errors.name}</ErrorText>}
        <div>
          <StripeInput
            value={this.state.name}
            onChange={this.setName}
            placeholder="Please enter your name"
          />
        </div>

        <Label>Card</Label>
        {stripeError != null && <ErrorText>{stripeError}</ErrorText>}
        <CardContainer>
          <CardElement
            style={{ base: { color: 'white', fontWeight: '500' } }}
          />
        </CardContainer>

        {hasCoupon && (
          <>
            <Label>Coupon</Label>
            <div>
              <StripeInput
                value={this.state.coupon}
                onChange={this.setCoupon}
                placeholder="Coupon or Discount Code"
              />
            </div>
          </>
        )}

        <Button
          type="submit"
          disabled={loading}
          style={{ marginTop: '1rem', width: 300 }}
        >
          {loading ? loadingText : buttonName}
        </Button>
      </form>
    );
  }
}

export const CheckoutForm = injectStripe(CheckoutFormComponent);
