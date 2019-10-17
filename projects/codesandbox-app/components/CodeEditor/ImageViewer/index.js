import React from 'react';
import Input from '@csb/common/lib/components/Input';
import { Button } from '@csb/common/lib/components/Button';
import { Container, Image, MaxWidth, SubTitle, Title } from './elements';
export class ImageViewer extends React.Component {
    constructor() {
        super(...arguments);
        this.onSubmit = (e) => {
            e.preventDefault();
            if (this.props.onSave) {
                this.props.onSave(this.input.value);
            }
        };
        this.doChangeCode = (e) => {
            this.props.onChange(e.target.value);
        };
    }
    render() {
        const { currentModule } = this.props;
        return (<Container style={{ width: this.props.width, height: this.props.height }} horizontal>
        <Title>Image</Title>
        <SubTitle>
          We refer to these files by URL, you can edit this url to change the
          image.
        </SubTitle>

        <Image src={currentModule.code} alt={currentModule.code}/>

        <MaxWidth onSubmit={this.onSubmit}>
          <Input ref={el => {
            this.input = el;
        }} onChange={this.doChangeCode} value={currentModule.code}/>
          <Button disabled={!currentModule.isNotSynced} type="submit">
            Save
          </Button>
        </MaxWidth>
      </Container>);
    }
}
