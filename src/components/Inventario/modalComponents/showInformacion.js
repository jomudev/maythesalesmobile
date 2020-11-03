import React from 'react';
import Header from '../showInformacionComponents/header';
import ListToShow from '../showInformacionComponents/listToShow';
import AddComponent from '../showInformacionComponents/addComponent';

class ShowComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addData: {
        visible: false,
      },
    };
    this.setAddData.bind(this);
  }
  setAddData = data => {
    this.setState({addData: data});
  };

  render() {
    return (
      <>
        <Header
          setModalValue={this.props.setModalValue}
          title={`Inventario: ${this.props.type}`}
        />

        <ListToShow setAddData={this.setAddData} type={this.props.type} />
        {this.state.addData.visible ? (
          <AddComponent setAddData={this.setAddData} type={this.props.type} />
        ) : null}
      </>
    );
  }
}

export default ShowComponent;
