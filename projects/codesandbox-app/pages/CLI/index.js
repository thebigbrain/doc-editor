import React, { useEffect } from 'react';
import { hooksObserver, inject } from 'app/componentConnectors';
import { Navigation } from 'app/pages/common/Navigation';
import { Container } from './elements';
import { Prompt } from './Prompt/index';
const CLI = inject('store', 'signals')(hooksObserver(({ signals: { cliMounted, signInCliClicked }, store: { user, authToken, isLoadingCLI, error }, }) => {
    useEffect(() => {
        cliMounted();
    }, [cliMounted]);
    return (<Container>
          <Navigation title="CLI Authorization"/>

          <Prompt error={error} loading={isLoadingCLI} signIn={signInCliClicked} token={authToken} username={user && user.username}/>
        </Container>);
}));
// eslint-disable-next-line import/no-default-export
export default CLI;
