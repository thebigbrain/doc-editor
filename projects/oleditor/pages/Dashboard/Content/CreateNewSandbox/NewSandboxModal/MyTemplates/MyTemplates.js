import React from 'react';
import { sandboxUrl } from '@csb/common/lib/utils/url-generator';
import CustomTemplate from '@csb/common/lib/components/CustomTemplate';
import history from '~/utils/history';
// import { useQuery } from '@apollo/react-hooks';
// import { LIST_TEMPLATES } from '../../../../queries';
import { Title } from '../elements';
import { MyTemplatesList } from './elements';
import {useOvermind} from '@muggle/hooks'

// Would be good to actually have this interface filled out
// Would be better if we could generate types from our GraphQL server


export const MyTemplates = ({ selectTemplate }) => {
  const {state} = useOvermind()
  const { data = {} } = useQuery(LIST_TEMPLATES, {
    variables: { showAll: true },
    fetchPolicy: 'cache-and-network',
  });

  if (!data.me) {
    return null;
  }

  if (data.me && !data.me.templates.length) {
    return null;
  }

  return (
    <>
      <Title>Templates</Title>
      <MyTemplatesList>
        {data.me
          ? data.me.templates.map((template, i) => (
            <CustomTemplate
              template={template}
              key={template.id}
              i={i}
              onClick={() => {
                if (selectTemplate) {
                  selectTemplate({ shortid: template.sandbox.id });
                } else {
                  history.push(sandboxUrl(template.sandbox));
                }
              }}
            />
          ))
          : new Array(3).fill({}).map((_, i) => <CustomTemplate i={i}/>)}
      </MyTemplatesList>
    </>
  );
};
