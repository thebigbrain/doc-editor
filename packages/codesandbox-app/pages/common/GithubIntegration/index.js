import React from 'react'
import { GoMarkGithub as GithubLogo } from 'react-icons/go'
import { Integration } from '~/components/Integration'
import { useOvermind } from '~/overmind'

export const GithubIntegration = ({ small = false }) => {
  const {
    actions: { signInGithubClicked, signOutGithubIntegration },
    state: {
      isLoadingGithub,
      user: {
        integrations: { github },
      },
    },
  } = useOvermind()

  return (
    <Integration
      bgColor="#4078c0"
      description={small ? 'Commits & PRs' : 'Committing & Pull Requests'}
      Icon={GithubLogo}
      loading={isLoadingGithub}
      name="GitHub"
      onSignIn={() => signInGithubClicked({ useExtraScopes: true })}
      onSignOut={signOutGithubIntegration}
      small={small}
      userInfo={github}
    />
  )
}
