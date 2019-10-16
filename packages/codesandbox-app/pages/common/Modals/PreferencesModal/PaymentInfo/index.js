import React from 'react';
import { inject, observer } from 'app/componentConnectors';
import { SubscribeForm } from 'app/components/SubscribeForm';
import { Card } from './Card/index';
import { Subheading, Title } from '../elements';
import { Container } from './elements';
class PaymentInfoComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.updatePaymentDetails = ({ token }) => {
            this.props.signals.preferences.paymentDetailsUpdated({ token });
        };
        this.paymentDetails = () => {
            const { preferences } = this.props.store;
            if (preferences.paymentDetailError)
                return <div>An error occurred: {preferences.paymentDetailError}</div>;
            return (<div>
        <Subheading>Current card</Subheading>
        <Card last4={preferences.paymentDetails.last4} name={preferences.paymentDetails.name} brand={preferences.paymentDetails.brand}/>

        <Subheading style={{ marginTop: '2rem' }}>Update card info</Subheading>
        <SubscribeForm buttonName="Update" loadingText="Updating Card Info..." name={preferences.paymentDetails.name} subscribe={this.updatePaymentDetails}/>
      </div>);
        };
    }
    componentDidMount() {
        this.props.signals.preferences.paymentDetailsRequested();
    }
    render() {
        const { preferences } = this.props.store;
        return (<Container>
        <Title>Payment Info</Title>
        {preferences.isLoadingPaymentDetails ? (<div>Loading payment details...</div>) : (this.paymentDetails())}
      </Container>);
    }
}
export const PaymentInfo = inject('store', 'signals')(observer(PaymentInfoComponent));
