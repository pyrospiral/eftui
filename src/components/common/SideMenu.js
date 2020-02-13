import { Sidebar } from "cisco-ui-components";
import React from "react";

class SideMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: true };
  }

  render() {
    return (
      <div>
        <Sidebar
          title="Sidebar"
          visible={this.state.visible}
          activeItem="item1"
          size="mini"
          color="indigo"
        >
          <a href="javascript:;" id="item1">
            <span className="icon-home" />
            <span>Item1</span>
          </a>
          <a href="javascript:;" id="item2">
            Item2
          </a>
        </Sidebar>
        <div className="pull-right">
          <button
            className="btn btn--small btn--primary"
            onClick={() => this.setState({ visible: !this.state.visible })}
          >
            Toggle
          </button>
        </div>
      </div>
    );
  }
}

export default SideMenu;
