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
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
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
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
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
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
      }
    }
  ]
};

const CREATE_RSS_SCHEDULE_TABLE_PARAMS = {
  TableName: 'RSS_SCHEDULE',
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
      AttributeName: 'RSS_URL',
      AttributeType: 'S'
    },
    {
      AttributeName: 'NEXT_START',
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
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  },
  GlobalSecondaryIndexes: [
    {
      IndexName: 'RSS_URL',
      KeySchema: [
        {
          AttributeName: 'RSS_URL',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'NEXT_START',
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
    },
    {
      IndexName: 'PODCAST_ID',
      KeySchema: [
        {
          AttributeName: 'PODCAST_ID',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'NEXT_START',
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

const UPDATE_RSS_SCHEDULE_TABLE_PARAMS = {
  TableName: 'RSS_SCHEDULE',
  StreamSpecification: {
    StreamEnabled: true,
    StreamViewType: 'NEW_AND_OLD_IMAGES'
  }
}

const UPDATE_RSS_SCHEDULE_TABLE_TTL_PARAMS = {
  TableName: 'RSS_SCHEDULE',
  TimeToLiveSpecification: {
    Enabled: true,
    AttributeName: 'NEXT_START'
  }
}

module.exports = {
  CREATE_PODCAST_TABLE_PARAMS,
  CREATE_EPISODE_TABLE_PARAMS,
  CREATE_RSS_SCHEDULE_TABLE_PARAMS,
  UPDATE_RSS_SCHEDULE_TABLE_PARAMS,
  UPDATE_RSS_SCHEDULE_TABLE_TTL_PARAMS
};
