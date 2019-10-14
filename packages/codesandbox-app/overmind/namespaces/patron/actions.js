import { withLoadApp } from '~/overmind/factories';
import { StripeErrorCode } from '../../utils/const';

export const patronMounted = withLoadApp();

export const priceChanged = (
  { state },
  { price },
) => {
  state.patron.price = price;
};

export const createSubscriptionClicked = async ({ state, effects }, { token, coupon }) => {
  effects.analytics.track('Create Patron Subscription');
  state.patron.error = null;
  state.patron.isUpdatingSubscription = true;
  try {
    state.user = await effects.api.createPatronSubscription(
      token,
      state.patron.price,
      coupon,
    );
    effects.notificationToast.error('Thank you very much for your support!');
  } catch (error) {
    if (
      error.error_code &&
      error.error_code === StripeErrorCode.REQUIRES_ACTION
    ) {
      try {
        await effects.stripe.handleCardPayment(error.data.client_secret);

        state.user = await effects.api.getCurrentUser();
        state.patron.error = null;
      } catch (e) {
        state.patron.error = e.message;
      }
    } else {
      state.patron.error = error.message;
    }
  }
  state.patron.isUpdatingSubscription = false;
};

export const updateSubscriptionClicked = async ({ state, effects }, { coupon }) => {
  effects.analytics.track('Update Patron Subscription');
  state.patron.error = null;
  state.patron.isUpdatingSubscription = true;
  try {
    state.user = await effects.api.updatePatronSubscription(
      state.patron.price,
      coupon,
    );
    effects.notificationToast.success(
      'Subscription updated, thanks for helping out!',
    );
  } catch (error) {
    state.patron.error = error.message;
  }
  state.patron.isUpdatingSubscription = false;
};

export const cancelSubscriptionClicked = async ({
                                                               state,
                                                               effects,
                                                             }) => {
  effects.analytics.track('Cancel Subscription');
  if (
    effects.browser.confirm(
      'Are you sure you want to cancel your subscription?',
    )
  ) {
    state.patron.error = null;
    state.patron.isUpdatingSubscription = true;

    try {
      state.user = await effects.api.cancelPatronSubscription();
      effects.notificationToast.success(
        'Sorry to see you go, but thanks a bunch for the support this far!',
      );
    } catch (error) {
      /* ignore */
    }

    state.patron.isUpdatingSubscription = false;
  }
};

export const tryAgainClicked = ({ state }) => {
  state.patron.error = null;
};
