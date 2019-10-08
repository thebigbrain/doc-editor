import React from 'react';
import Input from '@codesandbox/common/lib/components/Input';
import { Button } from '@codesandbox/common/lib/components/Button';
import { Container, Image, MaxWidth, SubTitle, Title } from './elements';

import { Props } from '../types'; // eslint-disable-line

export class ImageViewer extends React.Component<Props> {
  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (this.props.onSave) {
      this.props.onSave(this.input.value);
    }
  };

  input: HTMLInputElement;

  doChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(e.target.value);
  };

  render() {
    const { currentModule } = this.props;

    return (
      <Container
        style={{ width: this.props.width, height: this.props.height }}
        horizontal
      >
        <Title>Image</Title>
        <SubTitle>
          We refer to these files by URL, you can edit this url to change the
          image.
        </SubTitle>

        <Image src={currentModule.code} alt={currentModule.code}/>

        <MaxWidth onSubmit={this.onSubmit}>
          <Input
            ref={el => {
              this.input = el;
            }}
            onChange={this.doChangeCode}
            value={currentModule.code}
          />
          <Button disabled={!currentModule.isNotSynced} type="submit">
            Save
          </Button>
        </MaxWidth>
      </Container>
    );
  }
}
