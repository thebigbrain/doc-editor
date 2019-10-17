import React, { useEffect } from 'react';
import MaxWidth from '@csb/common/lib/components/flex/MaxWidth';
import Margin from '@csb/common/lib/components/spacing/Margin';
import { hooksObserver, inject } from 'app/componentConnectors';
import { Title } from '~/components/Title';
import { SubTitle } from '~/components/SubTitle';
import { Navigation } from 'app/pages/common/Navigation';
import { Code, Container, Content } from './elements';
const CLIInstructions = inject('signals')(hooksObserver(({ signals: { cliInstructionsMounted } }) => {
    useEffect(() => {
        cliInstructionsMounted();
    }, [cliInstructionsMounted]);
    return (<MaxWidth>
        <Margin vertical={1.5} horizontal={1.5}>
          <Container>
            <Navigation title="CLI Import"/>

            <Content vertical>
              <Title>Import from CLI</Title>

              <SubTitle>
                1. Install the CLI <Code>npm i -g codesandbox</Code>
              </SubTitle>

              <SubTitle>
                2. Go to your project <Code>cd path-of-your-project</Code>
              </SubTitle>

              <SubTitle>
                3. Deploy your project to CodeSandbox{' '}
                <Code>codesandbox ./</Code>
              </SubTitle>
            </Content>
          </Container>
        </Margin>
      </MaxWidth>);
}));
// eslint-disable-next-line import/no-default-export
export default CLIInstructions;
