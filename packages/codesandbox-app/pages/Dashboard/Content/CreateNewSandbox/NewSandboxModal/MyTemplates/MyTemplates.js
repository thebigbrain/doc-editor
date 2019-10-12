import React from 'react';
import { sandboxUrl } from '@codesandbox/common/lib/utils/url-generator';
import CustomTemplate from '@codesandbox/common/lib/components/CustomTemplate';
import history from '~/utils/history';
import { useQuery } from '@apollo/react-hooks';
import { LIST_TEMPLATES } from '../../../../queries';
import { Title } from '../elements';
import { MyTemplatesList } from './elements';

// Would be good to actually have this interface filled out
// Would be better if we could generate types from our GraphQL server


export const MyTemplates = ({ selectTemplate }) => {
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
