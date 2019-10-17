import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import MaxWidth from '@csb/common/lib/components/flex/MaxWidth';
import Margin from '@csb/common/lib/components/spacing/Margin';
import Centered from '@csb/common/lib/components/flex/Centered';
import { useOvermind } from '~/overmind';
import { Title } from '~/components/Title';
import { SubTitle } from '~/components/SubTitle';
import { Navigation } from '~/pages/common/Navigation';
import { PricingModal } from './PricingModal/index';
import { Content } from './elements';

const Patron= () => {
  const { actions } = useOvermind();

  useEffect(() => {
    actions.patron.patronMounted();
  }, [actions]);

  return (
    <MaxWidth>
      <>
        <Helmet>
          <title>Patron - CodeSandbox</title>
        </Helmet>
        <Margin vertical={1.5} horizontal={1.5}>
          <Navigation title="Become a Patron"/>
          <Content>
            <MaxWidth width={1024}>
              <>
                <Title>Become a CodeSandbox Patron!</Title>
                <SubTitle>
                  You can support us by paying a monthly amount of your choice.
                  <br/>
                  The money goes to all expenses of CodeSandbox.
                </SubTitle>

                <Centered horizontal>
                  <PricingModal/>
                </Centered>
              </>
            </MaxWidth>
          </Content>
        </Margin>
      </>
    </MaxWidth>
  );
};

export default Patron;
