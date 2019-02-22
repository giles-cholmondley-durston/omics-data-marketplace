import { Button, Card } from 'antd'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Datasets extends Component {
  constructor(props) {
    super()
    this.state = { dbAssets: [] }
  }

  componentWillReceiveProps() {
    if (this.props.ocean) {
      this.retrieveAssets()
    }
  }

  async retrieveAssets() {
    this.dbAssets = await this.props.ocean
      .searchAssetsByText('Office Humidity')
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
          <Button style={{ marginBottom: '25px' }}>Publish new dataset</Button>
        </Link>
        {dbAssets &&
          dbAssets.map(dbAsset => {
            const asset = dbAsset.service[2].metadata.base
            return (
              <Card key={dbAsset.id} style={{ marginBottom: '25px' }}>
                <h3>{asset.name}</h3>
                <p>{asset.description}</p>
                <p>
                  {asset.author} · {asset.license}
                </p>
                <p>
                  <b>Price:</b> {asset.price} Ọ
                </p>
                <Button onClick={() => this.consumeAsset(dbAsset)}>
                  Buy this dataset
                </Button>
              </Card>
            )
          })}
      </div>
    )
  }
}

export default Datasets
