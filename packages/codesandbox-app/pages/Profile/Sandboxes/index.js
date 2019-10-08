import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@codesandbox/common/lib/components/Button'
import { dashboardUrl } from '@codesandbox/common/lib/utils/url-generator'
import { inject, observer } from 'app/componentConnectors'
import { SandboxList } from 'app/components/SandboxList'
import { Navigation, NoSandboxes, Notice } from './elements'

const PER_PAGE_COUNT = 15

class Sandboxes extends React.Component {
  static defaultProps = {
    page: 1,
  }
  getLastPage = () => {
    if (this.props.source === 'currentSandboxes') {
      const { sandboxCount } = this.props.store.profile.current

      return Math.ceil(sandboxCount / PER_PAGE_COUNT)
    }

    const { givenLikeCount } = this.props.store.profile.current

    return Math.ceil(givenLikeCount / PER_PAGE_COUNT)
  }
  deleteSandbox = id => {
    this.props.signals.profile.deleteSandboxClicked({ id })
  }

  getPage(source, page) {
    if (!source) {
      return undefined
    }
    return source.get ? source.get(page) : source[page]
  }

  fetch(force = false) {
    const { signals, source, store, page } = this.props

    if (store.profile.isLoadingSandboxes) {
      return
    }

    if (
      force ||
      !store.profile[source] ||
      !this.getPage(store.profile[source], page)
    ) {
      switch (source) {
        case 'currentSandboxes':
          signals.profile.sandboxesPageChanged({ page })
          break
        case 'currentLikedSandboxes':
          signals.profile.likedSandboxesPageChanged({ page })
          break
        default:
      }
    }
  }

  componentDidMount() {
    this.fetch()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.page !== this.props.page ||
      prevProps.source !== this.props.source
    ) {
      this.fetch()
    }
  }

  getSandboxesByPage(sandboxes, page) {
    return sandboxes.get ? sandboxes.get(page) : sandboxes[page]
  }

  render() {
    const { store, source, page, baseUrl } = this.props
    const { isProfileCurrentUser } = store.profile
    const { isLoadingSandboxes } = store.profile
    const sandboxes = store.profile[source]

    if (
      isLoadingSandboxes ||
      !sandboxes ||
      !this.getSandboxesByPage(sandboxes, page)
    ) {
      return <div/>
    }

    const sandboxesPage = this.getSandboxesByPage(sandboxes, page)

    if (sandboxesPage.length === 0)
      return (
        <NoSandboxes source={source} isCurrentUser={isProfileCurrentUser}/>
      )

    return (
      <div>
        {isProfileCurrentUser && (
          <Notice>
            You
            {'\''}
            re viewing your own profile, so you can see your private and
            unlisted sandboxes. Others can
            {'\''}
            t. To manage your sandboxes you can go to your dashboard{' '}
            <Link to={dashboardUrl()}>here</Link>.
          </Notice>
        )}
        <SandboxList
          isCurrentUser={isProfileCurrentUser}
          sandboxes={sandboxesPage}
          onDelete={source === 'currentSandboxes' && this.deleteSandbox}
        />
        <Navigation>
          <div>
            {page > 1 && (
              <Button
                style={{ margin: '0 0.5rem' }}
                small
                to={`${baseUrl}/${page - 1}`}
              >
                {'<'}
              </Button>
            )}
            {this.getLastPage() !== page && (
              <Button
                style={{ margin: '0 0.5rem' }}
                small
                to={`${baseUrl}/${page + 1}`}
              >
                {'>'}
              </Button>
            )}
          </div>
        </Navigation>
      </div>
    )
  }
}

export default inject('signals', 'store')(observer(Sandboxes))
