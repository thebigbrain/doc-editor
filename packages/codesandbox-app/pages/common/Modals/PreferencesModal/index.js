import React from 'react'

import {
  MdColorLens as AppearanceIcon,
  MdCreditCard as CreditCardIcon,
  MdDeviceHub as IntegrationIcon
} from 'react-icons/md'
import {FaCode as CodeIcon, FaFlask as FlaskIcon, FaIndent as CodeFormatIcon} from 'react-icons/fa'
import {GoBrowser as BrowserIcon, GoKeyboard as KeyboardIcon, GoStar as StarIcon} from 'react-icons/go'

import {SideNavigation} from './SideNavigation/index'

import {Appearance} from './Appearance/index'
import {EditorSettings} from './EditorPageSettings/EditorSettings/index'
import {PreviewSettings} from './EditorPageSettings/PreviewSettings/index'
import {CodeFormatting} from './CodeFormatting/index'
import {PaymentInfo} from './PaymentInfo/index'
import {Integrations} from './Integrations/index'
import {Badges} from './Badges/index'
import {Experiments} from './Experiments/index'
import {KeyMapping} from './KeyMapping/index'
import {userOvermind} from '~/overmind'

import {Container, ContentContainer} from './elements'

function PreferencesModal(props) {
  const {state, actions} = userOvermind()

  const getItems = () => {
    const hasSubscription = state.isPatron
    const signedIn = state.isLoggedIn

    return [
      {
        id: 'appearance',
        title: 'Appearance',
        icon: <AppearanceIcon/>,
        content: <Appearance/>,
      },
      {
        id: 'editor',
        title: 'Editor',
        icon: <CodeIcon/>,
        content: <EditorSettings/>,
      },
      {
        id: 'prettierSettings',
        title: 'Prettier Settings',
        icon: <CodeFormatIcon/>,
        content: <CodeFormatting/>,
      },
      {
        id: 'preview',
        title: 'Preview',
        icon: <BrowserIcon/>,
        content: <PreviewSettings/>,
      },
      {
        id: 'keybindings',
        title: 'Key Bindings',
        icon: <KeyboardIcon/>,
        content: <KeyMapping/>,
      },
      signedIn && {
        id: 'integrations',
        title: 'Integrations',
        icon: <IntegrationIcon/>,
        content: <Integrations/>,
      },
      hasSubscription && {
        id: 'paymentInfo',
        title: 'Payment Info',
        icon: <CreditCardIcon/>,
        content: <PaymentInfo/>,
      },
      hasSubscription && {
        id: 'badges',
        title: 'Badges',
        icon: <StarIcon/>,
        content: <Badges/>,
      },
      {
        id: 'experiments',
        title: 'Experiments',
        icon: <FlaskIcon/>,
        content: <Experiments/>,
      },
    ].filter(x => x)
  }

  const items = getItems()
  const item = items.find(
    currentItem => currentItem.id === state.preferences.itemId,
  )

  return (
    <Container>
      <SideNavigation
        itemId={state.preferences.itemId}
        menuItems={items}
        setItem={actions.preferences.itemIdChanged}
      />
      <ContentContainer>{item.content}</ContentContainer>
    </Container>
  )

}

export default PreferencesModal
