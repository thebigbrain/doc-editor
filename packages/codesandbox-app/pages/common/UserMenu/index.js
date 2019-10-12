import * as React from 'react'
import Relative from '@codesandbox/common/lib/components/Relative'
import { HoverMenu } from '~/components/HoverMenu'
import { Menu } from './Menu/index'
import { ClickableContainer, ProfileImage } from './elements'
import { useOvermind } from '~/overmind'

export const UserMenu = () => {
  const {
    state: { user, userMenuOpen },
    actions: {
      userMenuClosed,
      modalOpened,
      signOutClicked,
      userMenuOpened,
      files,
    },
  } = useOvermind()

  return (
    <Relative>
      <ClickableContainer onClick={userMenuOpened}>
        <ProfileImage
          alt={user.username}
          width={30}
          height={30}
          src={user.avatarUrl}
        />
      </ClickableContainer>
      {userMenuOpen && (
        <HoverMenu onClose={() => userMenuClosed()}>
          <Menu
            openPreferences={() => modalOpened({ modal: 'preferences' })}
            openStorageManagement={files.gotUploadedFiles}
            signOut={signOutClicked}
            username={user.username}
            curator={user.curatorAt}
            openFeedback={() => modalOpened({ modal: 'feedback' })}
          />
        </HoverMenu>
      )}
    </Relative>

  )
}
