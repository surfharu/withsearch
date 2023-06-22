'use client'

import Image from 'next/image'
// import React from 'react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Typography, Input, Table } from 'antd'
// import 'antd/dist/reset.css'
import {
  FileOutlined,
} from '@ant-design/icons';

const { Title } = Typography
const { Search } = Input

export default function Home() {

  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [hiddenResult, setHiddenResult] = useState(true);
  const [pagination, setPagination] = useState({current:1, pageSize:10});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTotal()
  }, [])

  const fetchTotal = async () => {
    const res = await axios.get('http://localhost:9200/haru/_count')
    setTotal(res.data.count)
  } 

  const fetchSearch = async (value) => {
    const params = {
      "query": {
        "match": {
          "content": value
        }
      },
      "highlight": {
        "fields": {
            "content": {}
        }
      }
    }

    setLoading(true)
    const res = await axios.post('http://localhost:9200/haru/_search', params)
    // console.log(res)
    setLoading(false)
    setData(res.data.hits.hits)
    setHiddenResult(false)
  }

  const onSearch = (value) => {
    fetchSearch(value)
  };


  const columns = [
    {
      title: 'file',
      dataIndex: '_id',
      sorter: true,
      key: '_id',
      width: '150px',
      expandable: true,
      render: (text,row) => <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}><FileOutlined /> {text}</div>,
    },
    {
      title: 'phrases',
      dataIndex: 'highlight',
      sorter: true,
      key: 'highlight',
      expandable: true,
      render: (text,row) => {
        return (
          <ul>
            {text.content.map((el, idx) => {
              return (
                <li key={idx}>
                  <div dangerouslySetInnerHTML={{ __html:el }} />
                </li>
              )
            })}
          </ul>
        )
      }      
    },
    {
      title: 'score',
      dataIndex: '_score',
      sorter: true,
      key: '_score',
      width: '100px',
      expandable: true,
      render: (text,row) => <div>{text}</div>
    },
  ];

  return (
    <div className='container'>
      <Title>Document Search</Title>

      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />

      <div hidden={hiddenResult}>
        <p style={{textAlign:'left'}}>전체 문서 <b>{total} </b>개 중 <b> {data.length} </b>개의 문서가 검색되었습니다.</p>

        <Table
          rowKey={ item => { return item._id } }
          columns={columns}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          // expandedRowRender={row => <BulkExpander item={row} />}
          // expandRowByClick
          // rowSelection={rowSelection}
          onRow={record => ({
            onClick: e => {
              // console.log(`user clicked on row ${record.t1}!`);
            }
          })}
          // onChange={handleTableChange}
        />
      </div>
      
    </div>
  )
}
