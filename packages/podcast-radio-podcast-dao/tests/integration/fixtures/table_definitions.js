const CREATE_PODCAST_TABLE_PARAMS = {
  TableName: 'PODCAST',
  AttributeDefinitions: [
    {
      AttributeName: 'GUID',
      AttributeType: 'S'
    },
    {
      AttributeName: 'TITLE',
      AttributeType: 'S'
    },
    {
      AttributeName: 'AUTHOR',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'GUID',
      KeyType: 'HASH'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 100,
    WriteCapacityUnits: 100
  },
  GlobalSecondaryIndexes: [
    {
      IndexName: 'TITLE',
      KeySchema: [
        {
          AttributeName: 'TITLE',
          KeyType: 'HASH'
        }
      ],
      Projection: {
        ProjectionType: 'ALL'
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
      }
    },
    {
      IndexName: 'AUTHOR_TITLE',
      KeySchema: [
        {
          AttributeName: 'AUTHOR',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'TITLE',
          KeyType: 'RANGE'
        }
      ],
      Projection: {
        ProjectionType: 'ALL'
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
      }
    }
  ]
};

const CREATE_EPISODE_TABLE_PARAMS = {
  TableName: 'EPISODE',
  AttributeDefinitions: [
    {
      AttributeName: 'GUID',
      AttributeType: 'S'
    },
    {
      AttributeName: 'PODCAST_ID',
      AttributeType: 'S'
    },
    {
      AttributeName: 'PUBLICATION_DATE',
      AttributeType: 'N'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'GUID',
      KeyType: 'HASH'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 100,
    WriteCapacityUnits: 100
  },
  GlobalSecondaryIndexes: [
    {
      IndexName: 'PODCAST_ID',
      KeySchema: [
        {
          AttributeName: 'PODCAST_ID',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'PUBLICATION_DATE',
          KeyType: 'RANGE'
        }
      ],
      Projection: {
        ProjectionType: 'ALL'
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 100,
        WriteCapacityUnits: 100
      }
    }
  ]
};

module.exports = {
  CREATE_PODCAST_TABLE_PARAMS,
  CREATE_EPISODE_TABLE_PARAMS
};
