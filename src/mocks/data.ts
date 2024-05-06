export const origins = [
  'kosis',
  'ecos',
  'oecd'
]

export const kosisList = [
  {
    origin: 'kosis',
    name: '동행지수 순환변동치',
    description: '통계청에서 발표하는 동행지수 순환변동치입니다.',
    unit_ko: '2020=100',
    unit_en: '2020=100',
    code: 'CCI',
    hasMonth: true,
    hasQuarter: false,
    hasYear: false,
    hasDay: false
  },
  {
    origin: 'kosis',
    name: '선행지수 순환변동치',
    description: '통계청에서 발표하는 선행지수 순환변동치입니다.',
    unit_ko: '2020=100',
    unit_en: '2020=100',
    code: 'CLI',
    hasMonth: true,
    hasQuarter: false,
    hasYear: false,
    hasDay: false
  },
  {
    origin: 'kosis',
    name: '선행종합지수',
    description: '통계청에서 발표하는 선행종합지수로, 경제의 선행 신호를 제공하는 지표입니다.',
    unit_ko: '지수',
    unit_en: '인덱스',
    code: 'LCI',
    hasMonth: true,
    hasQuarter: false,
    hasYear: false,
    hasDay: false
  },
  {
    origin: 'kosis',
    name: '코스피 지수',
    description: '대표적인 한국의 주가지수로, 주식 시장의 종합적인 움직임을 나타내는 지표입니다.',
    unit_ko: '지수',
    unit_en: '인덱스',
    code: 'KOSPI',
    hasMonth: true,
    hasQuarter: false,
    hasYear: false,
    hasDay: false
  },
  {
    origin: 'kosis',
    name: '월별 소비자 물가 등락률 전년동월비(%)',
    description: '현재 월의 소비자물가지수와 전년 동월의 지수 값을 비교하여, 소비자물가의 연간 변동률을 나타내는 지표입니다.',
    unit_ko: '전년동월비 (%)',
    unit_en: 'YoY (%)',
    code: 'CPI_CR_YoY',
    hasMonth: true,
    hasQuarter: false,
    hasYear: false,
    hasDay: false
  },
  {
    origin: 'kosis',
    name: '코스피 시가총액',
    description: '한국 주식 시장에서 상장된 기업들의 시가 총액을 나타내는 지표입니다.',
    unit_ko: '천원',
    unit_en: 'Thousand Won',
    code: 'KOSPI_MARKET_CAP',
    hasMonth: true,
    hasQuarter: false,
    hasYear: false,
    hasDay: false
  },
  {
    origin: 'kosis',
    name: '경제성장률(GDP)(실질, 계절조정, 전기비)',
    description: '실질 GDP의 계절 조정된 분기별 성장률',
    unit_ko: '전기비 (%)',
    unit_en: 'QoQ (%)',
    code: 'RGDP_QoQ_SA',
    hasMonth: false,
    hasQuarter: true,
    hasYear: false,
    hasDay: false
  },
  {
    origin: 'kosis',
    name: '경제성장률(GDP)(실질, 원계열, 전년동기비)',
    description: '실질 GDP의 원계열 전년 대비 분기별 성장률',
    unit_ko: '전년동기비 (%)',
    unit_en: 'YoY (%)',
    code: 'RGDP_YoY_V',
    hasMonth: false,
    hasQuarter: true,
    hasYear: false,
    hasDay: false
  },
  {
    origin: 'kosis',
    name: 'GDP 디플레이터 등락률(원계열, 전년동기비)',
    description: 'GDP 디플레이터의 원계열 전년 대비 등락률',
    unit_ko: '전년동기비 (%)',
    unit_en: 'YoY (%)',
    code: 'GDPD_CR_YoY_V',
    hasMonth: false,
    hasQuarter: true,
    hasYear: false,
    hasDay: false
  },
  {
    origin: 'kosis',
    name: '국내총생산(GDP)(명목, 원화표시)(십억원)',
    description: '국내 총생산의 명목 가치로, 원화로 표시됩니다.',
    unit_ko: '십억원',
    unit_en: 'Bil.Won',
    code: 'NGDP_KRW',
    hasMonth: false,
    hasQuarter: false,
    hasYear: true,
    hasDay: false
  },
  {
    origin: 'kosis',
    name: '국내총생산(GDP)(명목, 달러표시)(억달러)',
    description: '국내 총생산의 명목 가치로, 미국 달러로 표시됩니다.',
    unit_ko: '억달러',
    unit_en: 'Hund.M U$',
    code: 'NGDP_USD',
    hasMonth: false,
    hasQuarter: false,
    hasYear: true,
    hasDay: false
  },
  {
    origin: 'kosis',
    name: '경제성장률(실질성장률)(%)',
    description: '국내 총생산의 실질 성장률을 나타내는 지표',
    unit_ko: '%',
    unit_en: '%',
    code: 'GDP_RGR',
    hasMonth: false,
    hasQuarter: false,
    hasYear: true,
    hasDay: false
  },
  {
    origin: 'kosis',
    name: 'GDP 디플레이터(2015=100)',
    description: '2015년을 기준으로 하는 GDP의 물가지수',
    unit_ko: '2015=100',
    unit_en: '2015=100',
    code: 'GDPD_B2015',
    hasMonth: false,
    hasQuarter: false,
    hasYear: true,
    hasDay: false
  },
  {
    origin: 'kosis',
    name: 'GDP 디플레이터(2015=100) 등락률(%)',
    description: 'GDP 디플레이터의 등락률 (%)',
    unit_ko: '등락률 (%)',
    unit_en: '등락률 (%)',
    code: 'GDPD_B2015_CR',
    hasMonth: false,
    hasQuarter: false,
    hasYear: true,
    hasDay: false
  }
]

export const ecosList = [
  {
    origin: 'ecos',
    name: '시장금리 국고채 (1년)',
    description: 'Govt. Bonds 1Y Rate',
    unit_ko: '연%',
    unit_en: 'Annual Percentage Rate (APR)',
    code: 'Govt. Bonds 1Y Rate',
    hasMonth: true,
    hasQuarter: true,
    hasYear: true,
    hasDay: true
  },
]

export const oecdList = [
  {
    origin: 'oecd',
    name: '선행지수 순환변동치 (OECD)',
    description: 'OECD에서 발표하는 선행지수 순환변동치입니다.',
    unit_ko: '2020=100',
    unit_en: '2020=100',
    code: 'CLI_OECD',
    hasMonth: true,
    hasQuarter: false,
    hasYear: false,
    hasDay: false
  },
]

export const dashboards = [
  {
    id: '001',
    name: '대시보드 1',
    data: [
      {
        line: [
          {
            origin: 'kosis',
            code: 'KOSPI',
            period: 'M',
            stroke: '#f00000',
            yAxisId: '1',
            referenceLineColor: '#f00000',
            referenceLineType: 'avg',
            label: {
              value: '지수',
              position: 'insideTopLeft',
              angle: 90
            }
          },
          {
            origin: 'kosis',
            code: 'CLI',
            period: 'M',
            stroke: '#0000cd',
            yAxisId: '2',
            referenceLineColor: '#0000f0',
            referenceLineType: 'N/A',
            label: {
              value: '2020=100',
              position: 'insideTopRight',
              angle: -90
            }
          }
        ]
      },
      {
        line: [
          {
            origin: 'kosis',
            code: 'KOSPI',
            period: 'M',
            stroke: '#434343',
            yAxisId: '1',
            referenceLineColor: '#f00000',
            referenceLineType: 'N/A',
            label: {
              value: '지수',
              position: 'insideTopLeft',
              angle: 90
            }
          }
        ]
      },
      {
        line: [
          {
            origin: 'ecos',
            code: 'Govt. Bonds 1Y Rate',
            period: 'A',
            stroke: '#AC32E4',
            yAxisId: '1',
            referenceLineColor: '#AC32E4',
            referenceLineType: 'N/A',
            label: {
              value: '연%',
              position: 'insideTopLeft',
              angle: 90
            }
          }
        ]
      }
    ]

  },
  {
    id: '002',
    name: '대시보드 2',
    data: []
  },
  {
    id: '003',
    name: '대시보드 3',
    data: [
      {
        line: [
          {
            origin: 'ecos',
            code: 'Govt. Bonds 1Y Rate',
            period: 'A',
            stroke: '#AC32E4',
            yAxisId: '1',
            referenceLineColor: '#AC32E4',
            referenceLineType: 'N/A',
            label: {
              value: '연%',
              position: 'insideTopLeft',
              angle: 90
            }
          }
        ]
      }
    ]
  }
]
