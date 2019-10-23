import React from 'react'
import { DelayedAnimation } from '~/components/DelayedAnimation'
import { Container, HeaderContainer, HeaderTitle } from '../elements'
import { SandboxGrid } from '../SandboxGrid/index'
import { Filters } from './Filters/index'
import { DashboardActions } from './Actions'

export function Content(props) {

  const {
    sandboxes, Header, SubHeader,
    isLoading, ExtraElement,
    hideOrder, hideFilters,
    possibleTemplates = [], page,
    actions = [],
  } = props

  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle>
          {Header}{' '}
          {
            sandboxes && !isLoading && (
              <span style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.6',
                marginLeft: '.5rem',
              }}>
                {sandboxes.length}
              </span>
            )
          }
        </HeaderTitle>
        <DashboardActions actions={actions}/>
        <Filters hideOrder={hideOrder} hideFilters={hideFilters} possibleTemplates={possibleTemplates}/>
      </HeaderContainer>
      {SubHeader}
      {
        isLoading
          ? (
            <DelayedAnimation delay={0.6} style={{
              textAlign: 'center',
              marginTop: '2rem',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.5)',
            }}>
              Fetching Sandboxes...
            </DelayedAnimation>
          )
          : (
            <SandboxGrid page={page} ExtraElement={ExtraElement} sandboxes={sandboxes}/>
          )
      }
    </Container>
  )

}
