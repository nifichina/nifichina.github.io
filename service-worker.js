/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "1-基础文档/1-Overview.html",
    "revision": "e10e58d7dff275c1da9fb502398f401b"
  },
  {
    "url": "1-基础文档/2-GettingStarted.html",
    "revision": "be29ba368aa095084d5c72daa31f2895"
  },
  {
    "url": "1-基础文档/3-UserGuide.html",
    "revision": "979ff665174ad06ff7f8555b7f099f89"
  },
  {
    "url": "1-基础文档/5-RecordPathGuide.html",
    "revision": "a8c37a032a0a5494cd4326c509fa47e7"
  },
  {
    "url": "1-基础文档/6-AdminGuide.html",
    "revision": "8321bc6dd61170881cca38bd3661902c"
  },
  {
    "url": "1-基础文档/7-ToolkitGuide.html",
    "revision": "ae4b8659b950fc1385e3edff149c4b10"
  },
  {
    "url": "2-开发文档/ApacheNiFiInDepth.html",
    "revision": "a26255dd8ff76f721a337feec4cb66e1"
  },
  {
    "url": "3-Processors/AttributeRollingWindow.html",
    "revision": "c0297ba1d309cd423caacd6aa2348c93"
  },
  {
    "url": "3-Processors/AttributesToCSV.html",
    "revision": "9d1cf3909f0ec0aa4a06921b98ac255c"
  },
  {
    "url": "3-Processors/AttributesToJSON.html",
    "revision": "fc4b5475bc128967dfab5fa416ae8bcb"
  },
  {
    "url": "3-Processors/Base64EncodeContent.html",
    "revision": "e8cf75542608c1cae318e1abb6d2c07b"
  },
  {
    "url": "3-Processors/CalculateRecordStats.html",
    "revision": "9bd8d29ecd33de91847698ad47ae5256"
  },
  {
    "url": "3-Processors/CaptureChangeMySQL.html",
    "revision": "0bb3c40482c04514ee794e32ea3e5b6f"
  },
  {
    "url": "3-Processors/CompareFuzzyHash.html",
    "revision": "eaf3c101bd7892a23311fad633afad78"
  },
  {
    "url": "3-Processors/ConsumeWindowsEventLog.html",
    "revision": "da926cbd9bae1bb1a406047517042a99"
  },
  {
    "url": "3-Processors/ControlRate.html",
    "revision": "6dce532d3936c7efdfe2f0695e35b7ad"
  },
  {
    "url": "3-Processors/ConvertCharacterSet.html",
    "revision": "482fb3668cbca898de834416a7d65b66"
  },
  {
    "url": "3-Processors/ConvertJSONToAvro.html",
    "revision": "e2950832dbb6bbafdb70f66d7380d46c"
  },
  {
    "url": "3-Processors/ConvertJSONToSQL.html",
    "revision": "5624af011881fca8e47d5876d7a23b4a"
  },
  {
    "url": "3-Processors/CountText.html",
    "revision": "eb377dd8290782963a1f6144b20a6a21"
  },
  {
    "url": "3-Processors/CryptographicHashAttribute.html",
    "revision": "25c085fd4bf89a4ae53473e354a94a4b"
  },
  {
    "url": "3-Processors/DetectDuplicate.html",
    "revision": "453b1feed9740a9ed0527028903a1279"
  },
  {
    "url": "3-Processors/DistributeLoad.html",
    "revision": "15f2e76a0c9d7fe0d209c249b3081e21"
  },
  {
    "url": "3-Processors/EvaluateJsonPath.html",
    "revision": "219aaf3c4f2c8d8642030b0f8a0ae85c"
  },
  {
    "url": "3-Processors/ExecuteGroovyScript.html",
    "revision": "e17cb4a09cf3c14cf33966cefbb7d6d6"
  },
  {
    "url": "3-Processors/ExecuteScript.html",
    "revision": "01753785fa706be8c4701e5590cacb2b"
  },
  {
    "url": "3-Processors/ExecuteSQL.html",
    "revision": "541fb3b7622192512d2bca06d0b4bb7d"
  },
  {
    "url": "3-Processors/ExecuteSQLRecord.html",
    "revision": "4ad217062214a4c0fd8cfa8664bc4867"
  },
  {
    "url": "3-Processors/ExtractText.html",
    "revision": "f11e98828bac66c968e01b2de2893e3e"
  },
  {
    "url": "3-Processors/FlattenJson.html",
    "revision": "6ea389d2ea3f7e1b0f75cd82c040ea3f"
  },
  {
    "url": "3-Processors/GenerateFlowFile.html",
    "revision": "0e5c8d042c66474c65874a48d2e524e3"
  },
  {
    "url": "3-Processors/GenerateTableFetch.html",
    "revision": "cd03e2201654686a3b3d3aeff718b8fa"
  },
  {
    "url": "3-Processors/HandleHttpRequest_HandleHttpResponse.html",
    "revision": "444068bf6cdcbf03ef0a18dcdeedb650"
  },
  {
    "url": "3-Processors/InvokeHTTP.html",
    "revision": "5f09468b341c045ec945fd13a05064ec"
  },
  {
    "url": "3-Processors/JoltTransformJSON.html",
    "revision": "3f3d7a52afaa5b388705d37e955aef4c"
  },
  {
    "url": "3-Processors/JoltTransformRecord.html",
    "revision": "7505309af8a66d4e55eb5efe084d9c8a"
  },
  {
    "url": "3-Processors/ListDatabaseTables.html",
    "revision": "d8f2c2f8ed04db8818eb557e7124fade"
  },
  {
    "url": "3-Processors/ListFile.html",
    "revision": "3c08e9cc9812154010a36c157409f2e9"
  },
  {
    "url": "3-Processors/ListFTP.html",
    "revision": "460b4025cddca73d6cb2a764201301ef"
  },
  {
    "url": "3-Processors/LogAttribute.html",
    "revision": "65fad7bf21b80b62836fe24053acbb5b"
  },
  {
    "url": "3-Processors/LogMessage.html",
    "revision": "c038c19b3b0f0dbff50e9c8f6734e97d"
  },
  {
    "url": "3-Processors/Notify.html",
    "revision": "e5671d22e6d5a60505347fc27fc46e4b"
  },
  {
    "url": "3-Processors/PutDatabaseRecord.html",
    "revision": "5b85adb1f11c4547527f4f7e2b537ea2"
  },
  {
    "url": "3-Processors/PutEmail.html",
    "revision": "3fe9f7bc5abb4164fd37f0c0963bd43d"
  },
  {
    "url": "3-Processors/PutHiveStreaming.html",
    "revision": "4a3bcdc403bf987794e13b55c14757ed"
  },
  {
    "url": "3-Processors/ReplaceText.html",
    "revision": "9395bc4e7957bc488047924c565bb5df"
  },
  {
    "url": "3-Processors/RouteOnAttribute.html",
    "revision": "c61bc8c096e77f40c0b930e0e61ee4d6"
  },
  {
    "url": "3-Processors/RouteOnContent.html",
    "revision": "5e298366629b833c9e8b3f67f05a6c65"
  },
  {
    "url": "3-Processors/SplitAvro.html",
    "revision": "7794561c418e30d6f951b8cf492efe25"
  },
  {
    "url": "3-Processors/SplitJson.html",
    "revision": "c223b8f519d1d9b5a068124332e60800"
  },
  {
    "url": "3-Processors/TailFile.html",
    "revision": "56583484f118f46633cf93e874c1ceec"
  },
  {
    "url": "3-Processors/UpdateAttribute.html",
    "revision": "f9f565e1b4f4543b96307ee421351f76"
  },
  {
    "url": "3-Processors/Wait.html",
    "revision": "203329803d3aeae213fe470d626d108b"
  },
  {
    "url": "4-ControllerService/AvroReader.html",
    "revision": "aac13457ffc7539ae40d45c15cdbac32"
  },
  {
    "url": "4-ControllerService/AvroRecordSetWriter.html",
    "revision": "05208d10eeea65bff4a37e1131e97c22"
  },
  {
    "url": "4-ControllerService/AvroSchemaRegistry.html",
    "revision": "e28a75708a1dfe857b81426998d2a98e"
  },
  {
    "url": "4-ControllerService/ConfluentSchemaRegistry.html",
    "revision": "397d22903bba410a8f967fe5f0e91303"
  },
  {
    "url": "4-ControllerService/DBCPConnectionPool.html",
    "revision": "280ee71f3c6ee89c0341e4595633c2a3"
  },
  {
    "url": "4-ControllerService/DBCPConnectionPoolLookup.html",
    "revision": "48a04a43f7d22cb590049ce9bc792c20"
  },
  {
    "url": "4-ControllerService/HortonworksSchemaRegistry.html",
    "revision": "83a9a0ccbab312e3daa643e53ff3a9ac"
  },
  {
    "url": "4-ControllerService/VolatileSchemaCache.html",
    "revision": "983ca60c44db977751f614b0c364473b"
  },
  {
    "url": "404.html",
    "revision": "69c2677f214dff3f0f1aeeeefe567de3"
  },
  {
    "url": "5-ReportingTask/PrometheusReportingTask.html",
    "revision": "d2b9d4cb1337387bb27832fdf9d847f5"
  },
  {
    "url": "assets/css/0.styles.ed588d1d.css",
    "revision": "fb7e82afe9ec5da7afc69db9875d74da"
  },
  {
    "url": "assets/img/fork.f2207327.png",
    "revision": "f220732776508e225af86b75448b548e"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/smallpr.5b498842.png",
    "revision": "5b498842b317a92bf3842a0e703a5896"
  },
  {
    "url": "assets/img/webide.5a585aa2.png",
    "revision": "5a585aa2eaac0c39cf15ef416358c41b"
  },
  {
    "url": "assets/js/10.62ab199b.js",
    "revision": "be5b64fcddc2774311a3c1b1de3c724d"
  },
  {
    "url": "assets/js/11.cfe5b742.js",
    "revision": "27facedfd263c4ee29a3cbde3c323ce2"
  },
  {
    "url": "assets/js/12.45dad5d3.js",
    "revision": "4cf2dec0f1e573de449ce200109dc304"
  },
  {
    "url": "assets/js/13.cfe1fa99.js",
    "revision": "e123c4362e36c28eddb10078a808c7bb"
  },
  {
    "url": "assets/js/14.eb6d6361.js",
    "revision": "5572245c3828ba461ddaa1a90ac5894c"
  },
  {
    "url": "assets/js/15.f5f50038.js",
    "revision": "e289c8e4158da103d77ea42e56f7490f"
  },
  {
    "url": "assets/js/16.bcbbe899.js",
    "revision": "4e0862f9a9db3eb932fdc2da86d3c5b2"
  },
  {
    "url": "assets/js/17.ed2a7766.js",
    "revision": "f2d398fa46b600d3487934cf56fb2922"
  },
  {
    "url": "assets/js/18.91234958.js",
    "revision": "944c34ca0e845fae7dd25b8ea7d40510"
  },
  {
    "url": "assets/js/19.5ce78400.js",
    "revision": "1dc8baeadc8525835ca754e2751a0950"
  },
  {
    "url": "assets/js/2.65ffbe52.js",
    "revision": "10e9e9385747a35ddaa1031b34625179"
  },
  {
    "url": "assets/js/20.3098155d.js",
    "revision": "fc6ab3ae891e92820ff16b18e2ebb133"
  },
  {
    "url": "assets/js/21.d12c27c3.js",
    "revision": "78ae31ee6d34fa43a858dde7d40d04ab"
  },
  {
    "url": "assets/js/22.31fa88b8.js",
    "revision": "200be376c06a52d28216a21cc5f319bf"
  },
  {
    "url": "assets/js/23.16cacd3d.js",
    "revision": "81c7e36debfc180fa61d26b49cb6e76a"
  },
  {
    "url": "assets/js/24.bed5c53c.js",
    "revision": "408e2574ea28c29aaa4ecc77bcad8e56"
  },
  {
    "url": "assets/js/25.566183db.js",
    "revision": "286614f7546fc30ff52a258307d20d5b"
  },
  {
    "url": "assets/js/26.9a38edc1.js",
    "revision": "ba0a25190b31e92b046fdfad462c6c15"
  },
  {
    "url": "assets/js/27.242651ed.js",
    "revision": "f5be371b31904e400be61c65bee03094"
  },
  {
    "url": "assets/js/28.6814bdc5.js",
    "revision": "a1325314be3d639f1444f2ff03d74566"
  },
  {
    "url": "assets/js/29.1affeb48.js",
    "revision": "509cf51516069d79f5a63d4b1714df24"
  },
  {
    "url": "assets/js/3.ed0d22fe.js",
    "revision": "f4ebfa6a8f7f731bd3bbe0cf1fe0c6c6"
  },
  {
    "url": "assets/js/30.24593a12.js",
    "revision": "fc7ff1dfe9236c67f4bd268bca1759e3"
  },
  {
    "url": "assets/js/31.6cc0823f.js",
    "revision": "2a2e15598b335e1b3458ed7ca08e9fab"
  },
  {
    "url": "assets/js/32.213c428a.js",
    "revision": "d1b057581f22a1f4fa14267a40d39c15"
  },
  {
    "url": "assets/js/33.25ef114a.js",
    "revision": "d612bf68be30c56ab82c3f8cc352f835"
  },
  {
    "url": "assets/js/34.9cc91d3b.js",
    "revision": "f1bb1d98cb17812cc575e22c98da0389"
  },
  {
    "url": "assets/js/35.19d26cf9.js",
    "revision": "fedfa108168cd31f06cf5995cef828e5"
  },
  {
    "url": "assets/js/36.1db6e40a.js",
    "revision": "a4b611c1fdb116ea5fd40b406da9d277"
  },
  {
    "url": "assets/js/37.ac0b2488.js",
    "revision": "21e5fc6e2f36d08b01d1d8b80cbb09a2"
  },
  {
    "url": "assets/js/38.4dd3b7df.js",
    "revision": "e17d2df1c5e8cdc0b5291860650e58fd"
  },
  {
    "url": "assets/js/39.e7593b19.js",
    "revision": "9bac5a1e39d5923bd364e3c64be0d375"
  },
  {
    "url": "assets/js/4.e4643266.js",
    "revision": "609c404b6dfa3d339b59a1d265684ab5"
  },
  {
    "url": "assets/js/40.cdf5329e.js",
    "revision": "8d5dd8ac67d70c6d744f31b84e5199a0"
  },
  {
    "url": "assets/js/41.6109e14b.js",
    "revision": "58438e2e2cbdb54a8475a85855b2ba0a"
  },
  {
    "url": "assets/js/42.06bfe4a5.js",
    "revision": "535ce8c3da72c66c74a42303deb24405"
  },
  {
    "url": "assets/js/43.9032d6e0.js",
    "revision": "3cb54897ea7cd422f523b9648b9110d1"
  },
  {
    "url": "assets/js/44.f028bb5d.js",
    "revision": "b6a8bea4cabe63b72f9fb8260d704ebe"
  },
  {
    "url": "assets/js/45.82adf304.js",
    "revision": "98b45aae8c402d2ed103dac461882432"
  },
  {
    "url": "assets/js/46.0fab72e0.js",
    "revision": "8c0d27f74e801245b7ecad7268651607"
  },
  {
    "url": "assets/js/47.51b0145e.js",
    "revision": "3e90a6db4df5c699253fdbbf8013e645"
  },
  {
    "url": "assets/js/48.2abe71f7.js",
    "revision": "1b95d2c69ebd075215765643af0989d8"
  },
  {
    "url": "assets/js/49.1ac12cd8.js",
    "revision": "dff95adaf9974a6b3a9325edce6d2e8a"
  },
  {
    "url": "assets/js/5.89b22d2c.js",
    "revision": "13058fb5fd25c1c3748a83d3be3a1c8c"
  },
  {
    "url": "assets/js/50.6ac70c7e.js",
    "revision": "e94bc871797db45cd527de0ad127fe7d"
  },
  {
    "url": "assets/js/51.3535db59.js",
    "revision": "779a295a3339d35e0e367c6dc451ff33"
  },
  {
    "url": "assets/js/52.fe1cd272.js",
    "revision": "fc826a4e2c6948c7b196eeb2a445db36"
  },
  {
    "url": "assets/js/53.be3d6d1b.js",
    "revision": "b1af33c2ec426fbc7f647562b26afeb4"
  },
  {
    "url": "assets/js/54.7cf39450.js",
    "revision": "e30a69491e7afa466a32c4f6116e8e6a"
  },
  {
    "url": "assets/js/55.d7db0fc1.js",
    "revision": "c99b0ef2abe6bebb49c85813d3771359"
  },
  {
    "url": "assets/js/56.3168a434.js",
    "revision": "68d2ab0189f33b91ea675f84eadaefd0"
  },
  {
    "url": "assets/js/57.45cbe2ee.js",
    "revision": "8f71054064fd84fab39cf4459de9d941"
  },
  {
    "url": "assets/js/58.6dce84f9.js",
    "revision": "2ca8368fd4f25554ee94187ac4500a1a"
  },
  {
    "url": "assets/js/59.6ad12285.js",
    "revision": "e400351ae2482663c33603ab518379ae"
  },
  {
    "url": "assets/js/6.026d10ac.js",
    "revision": "52b1ed3e27377b253b0a11bccf8ba58d"
  },
  {
    "url": "assets/js/60.c8f81731.js",
    "revision": "5894a5a554cea448eb8b691257d3795b"
  },
  {
    "url": "assets/js/61.aded0aa1.js",
    "revision": "ed47d30f4aaa57e3a0a027bc065d6a09"
  },
  {
    "url": "assets/js/62.f750a668.js",
    "revision": "26d4f1f0b8369ba05e19f315694abbcd"
  },
  {
    "url": "assets/js/63.00d64b1b.js",
    "revision": "6df0682676c383299c78087df57db940"
  },
  {
    "url": "assets/js/64.8ac8064c.js",
    "revision": "f0e7f5ccc64d3190acf0a0b9e02ccb06"
  },
  {
    "url": "assets/js/65.dfa74a78.js",
    "revision": "510c8417dd8bc58abdcebee901fd7b0b"
  },
  {
    "url": "assets/js/66.70b2bbec.js",
    "revision": "b2ad43850a143715ededa2fe005da98c"
  },
  {
    "url": "assets/js/67.859b57ab.js",
    "revision": "13043a60435aec76287afc3f8cf4c5fc"
  },
  {
    "url": "assets/js/68.431ced11.js",
    "revision": "62abbd4e26d79777910aee0a45155604"
  },
  {
    "url": "assets/js/69.64f25751.js",
    "revision": "0ef4baefc9fd81d47756f9b74238525c"
  },
  {
    "url": "assets/js/7.df44c01a.js",
    "revision": "fd62dc40fca06f0f462e77de5ef92486"
  },
  {
    "url": "assets/js/70.4f7d846c.js",
    "revision": "39b476eb4a48a4905f05e21d96404f70"
  },
  {
    "url": "assets/js/71.d926c988.js",
    "revision": "6d0df6b51d11d7c3001a4ce150a21eb5"
  },
  {
    "url": "assets/js/72.704557ef.js",
    "revision": "98e90067501ce9ca980506d9b4427580"
  },
  {
    "url": "assets/js/73.13a15d26.js",
    "revision": "b859493b8f25dc384007616789badfea"
  },
  {
    "url": "assets/js/74.06f0410a.js",
    "revision": "c617be78ad0e029808d4b99159b730a7"
  },
  {
    "url": "assets/js/75.a6007c8e.js",
    "revision": "2716b2a1b5b8b583c9d5bad08b6cb71b"
  },
  {
    "url": "assets/js/76.81c76a80.js",
    "revision": "1063998f81d560d975477f486588c062"
  },
  {
    "url": "assets/js/77.4b53ed34.js",
    "revision": "e0146b3bc4b5717e4c0efd2cf60011e1"
  },
  {
    "url": "assets/js/78.8eeea126.js",
    "revision": "0a1c7f2e445ed0cf847e44715c921ccb"
  },
  {
    "url": "assets/js/79.a85390e2.js",
    "revision": "89d02a50c16ceacb1b7f8817348f4b20"
  },
  {
    "url": "assets/js/8.6b67bf95.js",
    "revision": "1c7ee5658ebfb81f01d06d1f593252e5"
  },
  {
    "url": "assets/js/80.a7998fe3.js",
    "revision": "4742f5143ac95ecb20da97eddd4db661"
  },
  {
    "url": "assets/js/81.ea335a79.js",
    "revision": "3bbdbad4787ff50b60d0e2e8f32b1db8"
  },
  {
    "url": "assets/js/82.5bfbb658.js",
    "revision": "eff1bd42e9066270b5fac2cf6b62b917"
  },
  {
    "url": "assets/js/83.0e859121.js",
    "revision": "64e52d95c503ddb66ca69d17d386f9a5"
  },
  {
    "url": "assets/js/84.e11a0662.js",
    "revision": "61d3049cd5d97d3b7ef7314d314c4350"
  },
  {
    "url": "assets/js/85.f038cdb7.js",
    "revision": "458a1769023f0d2f26ebb0164f5b5214"
  },
  {
    "url": "assets/js/86.2ef33950.js",
    "revision": "3e89d5fcaeae1f415a2950308cb6138c"
  },
  {
    "url": "assets/js/9.d1154cbc.js",
    "revision": "588cfb4fa69493bdd3deb11eb786a353"
  },
  {
    "url": "assets/js/app.4ea34ae1.js",
    "revision": "ae708bfb199586c039a350ddd4cd19aa"
  },
  {
    "url": "index.html",
    "revision": "fc158b57fbe1ca308b652f803faa7717"
  },
  {
    "url": "index/comment.html",
    "revision": "c8227951cc85076e58804f1aca4b0408"
  },
  {
    "url": "index/donate.html",
    "revision": "e0909d9b016c1952733674a4e86aa672"
  },
  {
    "url": "index/edit.html",
    "revision": "ece6ae0df11bbdad228c7bddc0b6f444"
  },
  {
    "url": "index/newQuestions.html",
    "revision": "fa509f48b02c825d19d2d7116ced8a24"
  },
  {
    "url": "index/qq.html",
    "revision": "242c36f567ddb8b534a14c1c34c475c7"
  },
  {
    "url": "index/updateLog.html",
    "revision": "bc0af044d17f1b50bd89fd61671214e5"
  },
  {
    "url": "index/wechat.html",
    "revision": "5939b9d1726ad3dbbb9fc2f550eb177e"
  },
  {
    "url": "js/MouseClickEffect.js",
    "revision": "76c69a1d26f49386124093a2b29916da"
  },
  {
    "url": "logo.png",
    "revision": "640ba9b94d62ed9a390f57eb083737b7"
  },
  {
    "url": "待完成/0.html",
    "revision": "0cde4bdae4eef7c3dc66907aa900d4e5"
  },
  {
    "url": "待完成/4-ExpressionLanguageGuide.html",
    "revision": "e0e140fd1988b87369338d6f2e6cdd42"
  },
  {
    "url": "待完成/DeveloperGuide.html",
    "revision": "d97602e4988985d90edf54bcfb93cefb"
  },
  {
    "url": "待完成/ListGCSBucket.html",
    "revision": "081a5a274b020b67d2b524f4977fa3ef"
  },
  {
    "url": "待完成/ListHDFS.html",
    "revision": "15804d46cbd50fd2ecbc0cff56fd0c7b"
  },
  {
    "url": "待完成/ListS3.html",
    "revision": "9809035a8531a5449121e1efc4f1e2d3"
  },
  {
    "url": "待完成/ListSFTP.html",
    "revision": "030a1b92442fbabb47fe1c6bfd476a98"
  },
  {
    "url": "待完成/RestApi.html",
    "revision": "a5b9e452b5b3395da2a9f1a196a51548"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
