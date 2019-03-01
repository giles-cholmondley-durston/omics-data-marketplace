import { Button, Card, Col, Row } from 'antd'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Datasets extends Component {
  constructor(props) {
    super()
    this.state = { dbAssets: [] }
  }

  componentDidMount() {
    this.retrieveAssets()
  }

  async retrieveAssets() {
    this.dbAssets = await this.props.ocean
      .searchAssetsByText('vcf')
      .then(dbAssets => this.setState({ dbAssets }))
  }

  async consumeAsset(asset) {
    // get all accounts
    const accounts = await this.props.ocean.getAccounts()
    // get service we want to execute
    const service = asset.findServiceByType('Access')
    // sign service
    const serviceAgreementSignatureResult = await this.props.ocean.signServiceAgreement(
      asset.id,
      service.serviceDefinitionId,
      accounts[0]
    )

    // run it
    await this.props.ocean.initializeServiceAgreement(
      asset.id,
      service.serviceDefinitionId,
      serviceAgreementSignatureResult.agreementId,
      serviceAgreementSignatureResult.signature,
      // callback to handle the files we get
      files => {
        console.log('Asset files', files)
      },
      accounts[0]
    )
  }

  render() {
    const { dbAssets } = this.state
    return (
      <div>
        <Link to="/publish-dataset">
          <Button size="large" style={{ marginBottom: '25px' }}>
            Publish new dataset
          </Button>
        </Link>
        <Row gutter={24}>
          {dbAssets &&
            dbAssets.map(dbAsset => {
              const asset = dbAsset.service.filter(
                obj => obj.type === 'Metadata'
              )[0].metadata.base
              return (
                <Col xl={12} key={dbAsset.id}>
                  <Card style={{ marginBottom: '25px' }}>
                    <h3>{asset.name}</h3>
                    <p>{asset.description}</p>
                    <p>
                      {asset.author} · {asset.license}
                    </p>
                    <p>
                      <b>Price:</b> {asset.price} Ọ
                    </p>
                    <Button
                      size="large"
                      type="primary"
                      onClick={() => this.consumeAsset(dbAsset)}
                    >
                      Buy this dataset
                    </Button>
                  </Card>
                </Col>
              )
            })}
        </Row>
      </div>
    )
  }
}

export default Datasets
