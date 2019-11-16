import React from 'react';
import { PreferenceContainer, SubContainer, SubDescription, Title } from '../elements';
// const windowWithOvermind: {
//   useOvermind?: (val?: boolean) => 'true' | null;
// } = window as any;
export function Experiments() {
    // const bindValue = name => ({
    //   value: store.preferences.settings[name],
    //   setValue: value =>
    //     signals.preferences.settingChanged({
    //       name,
    //       value,
    //     }),
    // });
    // const [usingOvermind, setUsingOvermind] = React.useState(
    //   typeof windowWithOvermind.useOvermind !== 'undefined' &&
    //     windowWithOvermind.useOvermind() === 'true'
    // );
    return (<div>
      <Title>Experiments</Title>

      <SubContainer>
        <PreferenceContainer>
          <SubDescription>
            There are no experiments running at the moment. Stay tuned for new
            experiments!
          </SubDescription>
          
        </PreferenceContainer>
      </SubContainer>
    </div>);
}
// export default inject('store', 'signals')(observer(Experiments));
