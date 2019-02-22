import React, { Component } from 'react'

const asset = {
  base: {
    name: 'Acid Mine Drainage Metagenomes',
    description: 'Weather information of UK including temperature and humidity',
    dateCreated: '2012-02-01T10:55:11+00:00',
    author: 'Met Office',
    size: '3.1bg',
    license: 'Public Domain',
    copyrightHolder: 'Met Office',
    files: [
      {
        url: 'https://testocnfiles.blob.core.windows.net/testfiles/testzkp.zip',
        checksum: '085340abffh21495345af97c6b0e761',
        contentLength: '12324'
      },
      {
        url: 'https://testocnfiles.blob.core.windows.net/testfiles/testzkp2.zip'
      }
    ],
    contentType: 'text/csv',
    links: [
      {
        name: 'Dataset sample',
        type: 'sample',
        url:
          'http://data.ceda.ac.uk/badc/ukcp09/data/gridded-land-obs/gridded-land-obs-daily/'
      }
    ],
    tags: 'weather, uk, 2011, temperature, humidity',
    price: 5,
    type: 'dataset'
  },
  curation: {
    rating: 0,
    numVotes: 0,
    schema: 'Binary Voting'
  },
  additionalInformation: {
    updateFrequency: 'yearly'
  }
}

class PublishDataset extends Component {
  async submitAsset() {
    const accounts = await this.props.ocean.getAccounts()
    const ddo = await this.ocean.registerAsset(asset, accounts[0])
    alert('Asset successfully submited: ', JSON.stringify(ddo))
  }
  render() {
    return <button onClick={() => this.submitAsset()}>Submit asset</button>
  }
}

export default PublishDataset
