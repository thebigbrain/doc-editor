import React from 'react';
// import { action } from '@storybook/addon-actions';
import { OvermindProvider, useOvermind } from '@muggle/hooks';
import { createOvermind } from 'overmind';
import { merge, namespaced } from 'overmind/config'

export default {
  title: 'Overmind',
};

const state = {
  hello: 'hello'
};

const actions = {
  updateState({state}) {
    state.hello = Math.random().toString();
  }
};

const onInitialize = () => { };

const effects = {};

const config = merge(
  {
    onInitialize,
    effects,
    state,
    actions,
  },
  namespaced({
  }),
);

const App = () => {
  const {state, actions} = useOvermind();
  return (
    <div>
      <span>{state.hello}</span>
      <button onClick={actions.updateState}>click here</button>
    </div>
  );
};

export const useOM = () => (
  <OvermindProvider value={createOvermind(config, {devtools: false})}>
    <App />
  </OvermindProvider>
);
