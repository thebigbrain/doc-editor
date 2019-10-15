import React from 'react'
import Tags from '../Tags'
import {Overlay, SandboxDescription} from '../SandboxCard/elements'
import {Border, MyTemplate, TemplateSubTitle, TemplateTitle,} from './elements'
import {getSandboxName} from '../../utils/get-sandbox-name'

const BANNER = 'https://codesandbox.io/static/img/banner.png'
const SCREENSHOT_API_URL = (id) => `https://codesandbox.io/api/v1/sandboxes/${id}/screenshot.png`
const CustomTemplate = ({template, onClick, i}) => {
  if (!template) {
    return (<MyTemplate key={i}>
      <img height="109px" alt="loading" src={BANNER}/>
      <Border/>
      <div>
        <TemplateTitle>Loading</TemplateTitle>
      </div>
    </MyTemplate>)
  }
  const {sandbox} = template
  const title = getSandboxName(sandbox)
  return (<MyTemplate key={i} onClick={onClick} overlayHeight={109}>
    <img height="109px" src={process.env.NODE_ENV === 'development'
      ? BANNER
      : SCREENSHOT_API_URL(sandbox.id) || BANNER} alt={title}/>
    <Overlay>
      <SandboxDescription>{sandbox.description}</SandboxDescription>
      {sandbox.tags && <Tags tags={sandbox.tags}/>}
    </Overlay>
    <Border color={template.color}/>
    <div>
      <TemplateTitle>{title}</TemplateTitle>
      <TemplateSubTitle>{sandbox.description}</TemplateSubTitle>
    </div>
  </MyTemplate>)
}
export default CustomTemplate
