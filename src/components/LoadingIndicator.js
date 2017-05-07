import React, {PureComponent} from "react";

import RefreshIndicator from "material-ui/RefreshIndicator"

export default class LoadingIndicator extends PureComponent {
    render() {
        if (this.props.loading) return (
            <div style={{display: "flex", justifyContent: "center"}}>
                <RefreshIndicator
                    size={40}
                    left={10}
                    top={0}
                    status="loading"
                    style={{
                        position: 'relative',
                        marginLeft: "-20px"
                    }}
                />
            </div>
        );
        return null;
    }
}