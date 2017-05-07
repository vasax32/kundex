import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types"

import $ from 'jquery';

import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';

const Album = function ({title, imgSrc, buttons}) {
    return (
        <Paper style={{height: 64, display: "flex", margin: "15px 0"}}>
            <img src={imgSrc} height={64} width={64} alt="img"/>
            <div style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "0 5px"
            }}>
                <span style={{
                    fontSize: "24px",
                    color: "rgba(0, 0, 0, 0.87)",
                    display: "block",
                    lineHeight: "36px"
                }}>{title}</span>

                <div style={{alignSelf: "center", minWidth: (60 * buttons.length)}}>
                    {buttons.map(({visible, href, img}, i) =>
                        <FloatingActionButton key={i}
                                              backgroundColor="buttonface" mini={true}
                                              style={{
                                                  margin: "0 10px",
                                                  visibility: (visible ? "initial" : "hidden")
                                              }}
                                              href={href}
                                              ref={(el) => $(ReactDOM.findDOMNode(el)).find("a").attr("target", "_blank")}>
                            {img}
                        </FloatingActionButton>)
                    }
                </div>
            </div>
        </Paper>
    )
};

Album.propTypes = {
    title: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            visible: PropTypes.bool.isRequired,
            href: PropTypes.string.isRequired,
            img: PropTypes.node.isRequired
        })).isRequired
};

export default Album;