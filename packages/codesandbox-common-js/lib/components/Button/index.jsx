import React from 'react';
import { LinkButton, AButton, Button } from './elements';
function ButtonComponent({ style = {}, ...props }) {
    // Link
    if (props.to) {
        return <LinkButton style={style} {...props}/>;
    }
    if (props.href) {
        return <AButton style={style} {...props}/>;
    }
    return <Button style={style} {...props}/>;
}
export { ButtonComponent as Button };
