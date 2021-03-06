import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import CustomCard from '../../stateless/cards';
import TextImageInputShowcaseModifyDialog from './TextImageInputShowcaseModifyDialog';
import TextImageInputPreview from './TextImageInputPreview';
import toastr from 'toastr';

class TextImageInputShowcaseCard extends React.Component {
  constructor(props) {
    super(props);
    let initLabels = [];
    if (props.demoProps.inputComponentDemoModel.baseComponentId == '2') {
      initLabels = props.demoProps.inputComponentDemoModel.props;
    }
    this.state = {
      labels: initLabels,
      modifyDialogDisplay: false,
      previewDialogDisplay: false
    };
    this.demoModel = props.demoProps.demoModel;
    this.inputComponentDemoModel = props.demoProps.inputComponentDemoModel;
    this.inputComponentModelActions = props.demoProps.inputComponentModelActions;
    this.forwardAddress = props.demoProps.forwardAddress;
    this.showModifyDialog = this.showModifyDialog.bind(this);
    this.showPreviewDialog = this.showPreviewDialog.bind(this);
    this.updateInputComponentModel = this.updateInputComponentModel.bind(this);
    this.updateLabels = this.updateLabels.bind(this);
    this.getLabels = this.getLabels.bind(this);
    this.hideModifyDialog = this.hideModifyDialog.bind(this);
    this.hidePreviewDialog = this.hidePreviewDialog.bind(this);
  }

  showModifyDialog() {
    this.setState({modifyDialogDisplay: true});
  }

  hideModifyDialog() {
    this.setState({modifyDialogDisplay: false});
  }

  showPreviewDialog() {
    this.setState({previewDialogDisplay: true});
  }

  hidePreviewDialog() {
    this.setState({previewDialogDisplay: false});
  }

  updateInputComponentModel() {
    if(Object.keys(this.demoModel).length == 0) {
      toastr.error('Registration info not found! Register again');
      browserHistory.push('/');
    } else {
      this.inputComponentModelActions.updateInputComponentModel({
        id: this.demoModel.id,
        baseComponentId: 2,
        props: this.state.labels
      }).then(() => {
        browserHistory.push(this.forwardAddress);
      });
    }
  }

  updateLabels(data) {
    this.setState({labels: data});
  }

  getLabels() {
    return this.state.labels;
  }

  render() {
    return (
      <div>
        <CustomCard
          header="Text Image Input"
          width="five"
          centeredParent
          centeredSegment
          displayData = {[
          'Number of inputs: ' + this.state.labels.length
        ]}
          buttonData = {[
          {
            label: "Modify",
            onDeployClick: () => this.showModifyDialog()
          },
          {
            label: "Preview",
            onDeployClick: () => this.showPreviewDialog()
          },
          {
            label: "Use",
            onDeployClick: () => this.updateInputComponentModel()
          }
        ]}
        />
        {this.state.modifyDialogDisplay && <TextImageInputShowcaseModifyDialog
          functions={{
            updateLabels: this.updateLabels,
            hideModifyDialog: this.hideModifyDialog,
            getLabels: this.getLabels
          }}
        />}

        {this.state.previewDialogDisplay && <TextImageInputPreview
          functions={{
            getLabels: this.getLabels,
            hidePreviewDialog: this.hidePreviewDialog
          }}
        />}
      </div>

    );
  }
}

TextImageInputShowcaseCard.propTypes = {
  demoProps: PropTypes.object.isRequired
};

export default TextImageInputShowcaseCard;

