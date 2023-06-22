이 프로젝트는 Elasticsearch, fscrawler 를 활용한 문서 검색시스템 샘플입니다.  
보다 자세한 내용은 [Elasticsearch, fscrawler 기반 문서 검색 시스템 구축하기](https://surfharu.github.io/posts/tool-4/)를 참조해 주세요.

## Prerequisites
- docker

## Structure

| **Folder & File** | **Description** |
| --- | --- | 
| **elasticsearch** | 한국어 형태 분석기를 포함한 elasticsearch 이미지 생성하기 위한 폴더 | 
| **config** | 환경 설정 파일 (elasticsearch & fscrawler) |   
| **web** | 검색을 위한 web 페이지 (nextjs로 구성) |  
| **documents** | 검색을 위한 문서들을 저장할 위치 | 
| **logs** | 주요 서비스 로그 위치 |  
| **docker-compose.yml** | 서비스 docker-compose 설정 파일 |

## Usage
Build elasticsearch with nori-analyze:
```console
$ cd elastic 
$ docker build -t custom-elastic:latest .
```

Build web server:
```console
$ cd web
$ docker build -t custom-nginx:latest .
```

Run the program:
```console
$ docker-compose up -d
```
