import React from 'react'
import {CrossIcon, RefreshIcon, ArrowDropDown, ArrowDropUp} from '@muggle/icons'
import algoliasearch from 'algoliasearch/lite'
import compareVersions from 'compare-versions'
import Tooltip from '@csb/common/lib/components/Tooltip'
import { CSB_PKG_PROTOCOL } from '@csb/common/lib/utils/ci'
import { EntryContainer, Icon, IconArea } from '../../elements'
import { Link } from '../elements'
import { Version, VersionSelect } from './elements'
import { BundleSizes } from './BundleSizes'

function formatVersion(version) {
  if (CSB_PKG_PROTOCOL.test(version)) {
    const commitSha = version.match(/commit\/(.*)\//)
    if (commitSha && commitSha[1]) {
      return `csb:${commitSha[1]}`
    }
  }
  return version
}

export class VersionEntry extends React.PureComponent {
  constructor() {
    super(...arguments)
    this.state = {
      hovering: false,
      version: null,
      open: false,
      versions: [],
    }
    this.handleRemove = e => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }
      this.props.onRemove(this.props.dependency)
    }
    this.handleRefresh = e => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }
      this.props.onRefresh(this.props.dependency)
    }
    this.onMouseEnter = () => this.setState({ hovering: true })
    this.onMouseLeave = () => this.setState({ hovering: false })
    this.handleOpen = () => this.setState(({ open }) => ({ open: !open }))
  }

  setVersionsForLatestPkg(pkg) {
    const that = this
    fetch(`/api/v1/dependencies/${pkg}`)
      .then(response => response.json())
      .then(data => that.setState({ version: data.data.version }))
      .catch(err => {
        if (process.env.NODE_ENV === 'development') {
          console.error(err) // eslint-disable-line no-console
        }
      })
  }

  UNSAFE_componentWillMount() {
    const { dependencies, dependency } = this.props
    const client = algoliasearch('OFCNCOG2CU', '00383ecd8441ead30b1b0ff981c426f5')
    const index = client.initIndex('npm-search')
    index.getObject(dependency, ['versions']).then(({ versions: results }) => {
      const versions = Object.keys(results).sort((a, b) => {
        try {
          return compareVersions(b, a)
        }
        catch (e) {
          return 0
        }
      })
      this.setState({
        versions,
      })
    })
    try {
      const versionRegex = /^\d{1,3}\.\d{1,3}.\d{1,3}$/
      const version = dependencies[dependency]
      if (!versionRegex.test(version)) {
        this.setVersionsForLatestPkg(`${dependency}@${version}`)
      }
    }
    catch (e) {
      console.error(e)
    }
  }

  render() {
    const { dependencies, dependency } = this.props
    if (typeof dependencies[dependency] !== 'string') {
      return null
    }
    const { hovering, version, open, versions } = this.state
    return (<>
      <EntryContainer onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <Link href={`https://www.npmjs.com/package/${dependency}`}>
          {dependency}
        </Link>
        <VersionSelect 
          hovering={hovering} 
          onChange={e => {
            this.props.onRefresh(dependency, e.target.value)
            this.setState({ hovering: false })
          }}
          value={dependencies[dependency]}
        >
          {versions.map(a => (<option key={a}>{a}</option>))}
        </VersionSelect>
        <Version hovering={hovering}>
          {formatVersion(dependencies[dependency])}{' '}
          {hovering && version && <span>({formatVersion(version)})</span>}
        </Version>

        {hovering && (<IconArea>
          <Tooltip content={open ? 'Hide sizes' : 'Show sizes'} style={{ outline: 'none' }}>
            <Icon onClick={this.handleOpen}>
              {open ? <ArrowDropUp/> : <ArrowDropDown/>}
            </Icon>
          </Tooltip>
          <Tooltip content="Update to latest" style={{ outline: 'none' }}>
            <Icon onClick={this.handleRefresh}>
              <RefreshIcon/>
            </Icon>
          </Tooltip>
          <Tooltip content="Remove" style={{ outline: 'none' }}>
            <Icon onClick={this.handleRemove}>
              <CrossIcon/>
            </Icon>
          </Tooltip>
        </IconArea>)}
      </EntryContainer>
      {open ? (<BundleSizes dependency={dependency} version={dependencies[dependency]}/>) : null}
    </>)
  }
}
