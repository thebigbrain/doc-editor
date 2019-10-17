import React, { useRef, useState } from 'react';
import { hooksObserver, inject } from 'app/componentConnectors';
import { Link } from 'react-router-dom';
import { useClickAway } from 'react-use';
import { SketchPicker } from 'react-color';
import Tooltip from '@csb/common/lib/components/Tooltip';
import Switch from '@csb/common/lib/components/Switch';
import * as templates from '@csb/common/lib/templates';
import { Explanation, Icon as QuestionIcon, Item, PropertyName, PropertyValue } from '../elements';
import { PickColor, PickerContainer, PublicValue } from './elements';
import { WorkspaceItem } from '../../WorkspaceItem/index';
import { Icon } from './Icon/index';
export const TemplateConfig = inject('store', 'signals')(hooksObserver(({ signals: { workspace: { editTemplate }, }, store: { editor: { currentSandbox: { template, customTemplate }, }, }, }) => {
    const picker = useRef(null);
    const defaultColor = (customTemplate && customTemplate.color) ||
        templates.default(template).color();
    const [showPicker, setShowPicker] = useState(false);
    const [publicTemplate, setPublic] = useState(customTemplate.published);
    const [selectedColor, setSelectedColor] = useState(defaultColor);
    const colors = Object.keys(templates)
        .filter(x => x !== 'default')
        .map(t => templates[t])
        .map(a => ({ color: a.color(), title: a.niceName }));
    useClickAway(picker, () => {
        setShowPicker(false);
        editTemplate({
            template: {
                color: selectedColor,
            },
        });
    });
    const togglePublic = () => {
        editTemplate({
            template: {
                ...customTemplate,
                published: !publicTemplate,
            },
        });
        setPublic(!publicTemplate);
    };
    return (<WorkspaceItem showOverflow defaultOpen title="Template">
          <Explanation style={{ marginTop: 0, marginBottom: '.5rem' }}>
            This is a template, you can find more info about templates
            <Link target="_blank" to="/docs/templates">
              {' '}
              here
            </Link>
            .
          </Explanation>
          <Item style={{ marginTop: '0.5rem' }}>
            <PropertyName>Color</PropertyName>
            <PropertyValue relative>
              <PickColor onClick={() => setShowPicker(true)} color={selectedColor}/>
              {showPicker && (<PickerContainer ref={picker}>
                  <SketchPicker disableAlpha id="color" onChangeComplete={(color) => setSelectedColor(color.hex)} color={selectedColor} presetColors={[...new Set(colors)]}/>
                </PickerContainer>)}
            </PropertyValue>
          </Item>
          <Item>
            <PropertyName>
              Public
              <Tooltip boundary="viewport" content="Whether this template will show in our upcoming templates page">
                <QuestionIcon />
              </Tooltip>
            </PropertyName>
            <PublicValue>
              <Switch small onClick={togglePublic} right={publicTemplate} offMode secondary/>
            </PublicValue>
          </Item>
          <Icon />
        </WorkspaceItem>);
}));
