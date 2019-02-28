import { Button, Col, Divider, Form, Input, message, Row } from 'antd'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import defaultAsset from './constants/defaultAsset'

const FormItem = Form.Item

class PublishDataset extends Component {
  constructor(props) {
    super()
    this.state = {
      asset: defaultAsset,
      registering: false
    }

    this.registerAsset = this.registerAsset.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handleAuthorChange = this.handleAuthorChange.bind(this)
    this.handleFileUrlChange = this.handleFileUrlChange.bind(this)
    this.handleSizeChange = this.handleSizeChange.bind(this)
    this.handleContentTypeChange = this.handleContentTypeChange.bind(this)
    this.handleLinkChange = this.handleLinkChange.bind(this)
    this.handleCopyrightHolderChange = this.handleCopyrightHolderChange.bind(
      this
    )
    this.handleLicenseChange = this.handleLicenseChange.bind(this)
    this.handleTagsChange = this.handleTagsChange.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handleUpdateFrequencyChange = this.handleUpdateFrequencyChange.bind(
      this
    )
  }

  async registerAsset() {
    this.setState({ registering: true })

    const accounts = await this.props.ocean.getAccounts()

    let asset = this.state.asset

    asset.base.dateCreated = new Date()

    await this.props.ocean
      .registerAsset(asset, accounts[0])
      .catch(err => console.log(err))

    this.setState({ asset: defaultAsset, registering: false })
    await this.props.history.push('/')
    message.success('Asset published')
  }

  handleNameChange(e) {
    let asset = { ...this.state.asset }
    asset.base.name = e.target.value
    this.setState({ asset })
  }

  handleDescriptionChange(e) {
    let asset = { ...this.state.asset }
    asset.base.description = e.target.value
    this.setState({ asset })
  }

  handleAuthorChange(e) {
    let asset = { ...this.state.asset }
    asset.base.author = e.target.value
    this.setState({ asset })
  }

  handleCopyrightHolderChange(e) {
    let asset = { ...this.state.asset }
    asset.base.copyrightHolder = e.target.value
    this.setState({ asset })
  }

  handleFileUrlChange(e) {
    let asset = { ...this.state.asset }
    asset.base.files[0].url = e.target.value
    this.setState({ asset })
  }

  handleSizeChange(e) {
    let asset = { ...this.state.asset }
    asset.base.size = e.target.value
    this.setState({ asset })
  }

  handleContentTypeChange(e) {
    let asset = { ...this.state.asset }
    asset.base.contentType = e.target.value
    this.setState({ asset })
  }

  handleLinkChange(e) {
    let asset = { ...this.state.asset }
    asset.base.links[0].url = e.target.value
    this.setState({ asset })
  }

  handleLicenseChange(e) {
    let asset = { ...this.state.asset }
    asset.base.license = e.target.value
    this.setState({ asset })
  }

  handleTagsChange(e) {
    let asset = { ...this.state.asset }
    asset.base.tags = e.target.value
    this.setState({ asset })
  }

  handlePriceChange(e) {
    let asset = { ...this.state.asset }
    asset.base.price = e.target.value
    this.setState({ asset })
  }

  handleUpdateFrequencyChange(e) {
    let asset = { ...this.state.asset }
    asset.additionalInformation.updateFrequency = e.target.value
    this.setState({ asset })
  }

  render() {
    const { base, additionalInformation } = this.state.asset
    const { registering } = this.state

    return (
      <Row>
        <Col lg={12}>
          <h2>Publish Dataset</h2>
          <form onSubmit={this.handleSubmit}>
            <FormItem label="Name" colon={false}>
              <Input
                size="large"
                type="text"
                value={base.name}
                onChange={this.handleNameChange}
              />
            </FormItem>
            <FormItem label="Description" colon={false}>
              <Input.TextArea
                size="large"
                value={base.description}
                onChange={this.handleDescriptionChange}
              />
            </FormItem>
            <FormItem label="Author" colon={false}>
              <Input
                size="large"
                type="text"
                value={base.author}
                onChange={this.handleAuthorChange}
              />
            </FormItem>
            <FormItem label="Copyright Holder" colon={false}>
              <Input
                size="large"
                type="text"
                value={base.copyrightHolder}
                onChange={this.handleCopyrightHolderChange}
              />
            </FormItem>
            <FormItem label="License" colon={false}>
              <Input
                size="large"
                type="text"
                value={base.license}
                onChange={this.handleLicenseChange}
              />
            </FormItem>
            <Divider />
            <FormItem label="File URL" colon={false}>
              <Input
                size="large"
                type="text"
                value={base.files[0].url}
                onChange={this.handleFileUrlChange}
              />
            </FormItem>
            <FormItem label="File Size" colon={false}>
              <Input
                size="large"
                type="text"
                value={base.size}
                onChange={this.handleSizeChange}
              />
            </FormItem>
            <FormItem label="File Format" colon={false}>
              <Input
                size="large"
                type="text"
                value={base.contentType}
                onChange={this.handleContentTypeChange}
              />
            </FormItem>
            <Divider />
            <FormItem label="Link for more info" colon={false}>
              <Input
                size="large"
                type="text"
                value={base.links[0].url}
                onChange={this.handleLinkChange}
              />
            </FormItem>
            <FormItem label="Tags" colon={false}>
              <Input
                size="large"
                type="text"
                value={base.tags}
                onChange={this.handleTagsChange}
              />
            </FormItem>
            <FormItem label="Price in Ọ" colon={false}>
              <Input
                size="large"
                type="number"
                value={base.price}
                onChange={this.handlePriceChange}
              />
            </FormItem>
            <FormItem label="Update frequency" colon={false}>
              <Input
                size="large"
                type="text"
                value={additionalInformation.updateFrequency}
                onChange={this.handleUpdateFrequencyChange}
              />
            </FormItem>

            <Button
              size="large"
              type="primary"
              onClick={this.registerAsset}
              loading={registering}
            >
              {registering ? 'Complete MetaMask flow' : 'Publish dataset'}
            </Button>
          </form>
        </Col>
      </Row>
    )
  }
}

export default withRouter(PublishDataset)
