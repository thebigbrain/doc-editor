import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { STRIPE_API_KEY } from '@csb/common/lib/utils/config';
import { useScript } from 'app/hooks';
import { CheckoutForm } from './CheckoutForm/index';
import { Container } from './elements';
const context = window;
export const SubscribeForm = ({ name, subscribe, loadingText = 'Creating Subscription...', buttonName = 'Subscribe', isLoading = false, error, hasCoupon, }) => {
    const [stripe, setStripe] = React.useState(null);
    const [loaded] = useScript('https://js.stripe.com/v3/');
    React.useEffect(() => {
        if (context.Stripe) {
            setStripe(context.Stripe(STRIPE_API_KEY));
        }
    }, [loaded]);
    return (<>
      <Container>
        <StripeProvider stripe={stripe}>
          <Elements>
            <CheckoutForm buttonName={buttonName} loadingText={loadingText} subscribe={subscribe} name={name} isLoading={isLoading} error={error} hasCoupon={hasCoupon}/>
          </Elements>
        </StripeProvider>
      </Container>
    </>);
};
