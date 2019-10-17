import React from 'react';
import * as typeformEmbed from '@typeform/embed';
import hash from '@csb/common/lib/utils/hash';
import { hooksObserver, inject } from 'app/componentConnectors';
import { Container } from './elements';
export const SurveyModal = inject('store', 'signals')(hooksObserver(({ store, signals }) => {
    const initializeTypeform = (el) => {
        if (el) {
            typeformEmbed.makeWidget(el, `https://codesandbox.typeform.com/to/LYbjII?userid=${hash(store.user.id)}&ispatron=${store.isPatron}`, {
                opacity: 0,
                hideScrollbars: true,
                hideFooter: true,
                hideHeaders: true,
                onSubmit: () => {
                    setTimeout(() => {
                        signals.modalClosed();
                    }, 3000);
                },
            });
        }
    };
    return (<Container>
        <div style={{ width: '100%', height: 500 }} ref={initializeTypeform}/>
      </Container>);
}));
