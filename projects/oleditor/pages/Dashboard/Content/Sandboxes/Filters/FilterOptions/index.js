import React from 'react'
import { orderBy } from 'lodash-es'
import {useOvermind} from '@muggle/hooks'

import { Overlay as OverlayComponent } from '~/components/Overlay'
import { Container, OverlayContainer, TemplatesName } from './elements'
import { Option } from './Option'

const FilterOptionsComponent = ({ possibleTemplates, hideFilters }) => {
  const {state, actions } = useOvermind()

  const toggleTemplate = (name, select) => select
    ? actions.dashboard.blacklistedTemplateRemoved({
      template: name,
    })
    : actions.dashboard.blacklistedTemplateAdded({
      template: name,
    })
  const allSelected = possibleTemplates.every(t => state.dashboard.isTemplateSelected(t.id))
  const Overlay = () => (<OverlayContainer>
    {possibleTemplates.length > 0 ? (<>
      {orderBy(possibleTemplates, 'niceName').map(template => {
        const selected = state.dashboard.isTemplateSelected(template.id)
        return (<Option toggleTemplate={toggleTemplate} selected={selected} key={template.name} color={template.color}
                        id={template.id} niceName={template.niceName || template.name}/>)
      })}

      <Option toggleTemplate={() => {
        if (!allSelected) {
          actions.dashboard.blacklistedTemplatesCleared()
        }
        else {
          actions.dashboard.blacklistedTemplatesChanged({
            templates: possibleTemplates.map(t => t.id) || [],
          })
        }
      }} selected={allSelected} color="#374140" id="all" style={{ marginTop: '1rem' }} niceName="Select All"/>
    </>) : ('No environments found')}
  </OverlayContainer>)
  const { blacklistedTemplates } = state.dashboard.filters
  const templateCount = possibleTemplates.length - blacklistedTemplates.length
  const templateMessage = templateCount === possibleTemplates.length && templateCount > 0
    ? 'all environments'
    : `${Math.max(0, templateCount)} ${templateCount === 1 ? 'environment' : 'environments'}`
  return (<OverlayComponent event="Dashboard - Order By" content={Overlay}>
    {open => (<Container hideFilters={hideFilters}>
      Showing{' '}
      <TemplatesName onClick={open}>{templateMessage}</TemplatesName>
    </Container>)}
  </OverlayComponent>)
}
export const FilterOptions = FilterOptionsComponent
