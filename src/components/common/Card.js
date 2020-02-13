import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class Card extends React.Component {
  render() {
    let mainClass = classNames({
      card: true,
      "card--centered": this.props.centered,
      "card--right": this.props.right,
      "card--raised": this.props.raised,
      hover: this.props.hover,
      selected: this.props.selected,
      "base-margin-bottom": true
    });
    const titleClass = classNames({
      cart__title: true,
      "text-uppercase": this.props.titleUpperCase
    });
    return (
      <div className={mainClass}>
        {this.props.title ? (
          <div
            className={`card__header ${this.props.titleColor}`}
            style={{ overflow: "visible" }}
          >
            <div className={"flex"}>
              <div className={"flex-fluid"}>
                <span className={titleClass}>{this.props.title}</span>
              </div>
              {this.props.buttons}
            </div>
          </div>
        ) : null}
        <div className={"card__body"}>{this.props.children}</div>
        {this.props.footer ? (
          <div className={"card__footer"}>{this.props.footer}</div>
        ) : null}
      </div>
    );
  }
}

Card.TITLE_COLOR = {
  LTGRAY: "hero hero--ltgray",
  MDGRAY: "hero hero--mdgray",
  DKGRAY: "hero hero--dkgray",
  BLUE: "hero hero--blue",
  VIBBLUE: "hero hero--vibblue",
  INDIGO: "hero hero--indigo",
  SUCCESS: "hero hero--success"
};

Card.propTypes = {
  centered: PropTypes.bool,
  right: PropTypes.bool,
  raised: PropTypes.bool,
  hover: PropTypes.bool,
  selected: PropTypes.bool,
  title: PropTypes.string,
  titleUpperCase: PropTypes.bool,
  titleColor: PropTypes.oneOf(Object.values(Card.TITLE_COLOR)),
  buttons: PropTypes.array,
  children: PropTypes.node,
  footer: PropTypes.node
};

Card.defaultProps = {
  centered: true,
  raised: true,
  titleColor: Card.TITLE_COLOR.VIBBLUE
};

export { Card };
