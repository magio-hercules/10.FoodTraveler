import React from 'react';
import { View, ListView, StyleSheet, Text, FlatList, Button, Image, TouchableHighlight } from 'react-native';

import { Divider, Avatar } from 'react-native-elements';
import { observer, inject } from 'mobx-react';

import LayoutInfo from '../constants/Layout';

var Sound = require('react-native-sound');

var dataTTS = [
	{
		id: 1,
		language_ko: '여기요',
		language_en: 'Hello',
		language_zh_cn: '你好',
		language_zh_tw: '你好',
		language_jp: 'こんにちは',
		desc_ko: '여기요',
		phonetic: 'yeo gi yo',
		file_name: 'tts1',
	},
	{
		id: 2,
		language_ko: '자리 있어요?',
		language_en: 'Can we get a table?',
		language_zh_cn: '我们可以得到一个表?',
		language_zh_tw: '我們可以得到一個表?',
		language_jp: 'テーブルをもらえますか?',
		desc_ko: '자리 있어요?',
		phonetic: 'jari it seo yo',
		file_name: 'tts2',
	},
	{
		id: 3,
		language_ko: '얼마나 기다려야 해요?',
		language_en: 'How long will it take?',
		language_zh_cn: '这需要多长时间？',
		language_zh_tw: '這需要多長時間？',
		language_jp: 'どのくらい時間がかかりますか？',
		desc_ko: '얼마나 기다려야 해요?',
		phonetic: 'lmana gida reoya haeyo',
		file_name: 'tts3',
	},
	{
		id: 4,
		language_ko: '저쪽 자리로 옮기고 싶어요.',
		language_en: 'Could we move to that table?',
		language_zh_cn: '难道我们移动到该表。',
		language_zh_tw: '難道我們移動到該表。',
		language_jp: 'そのテーブルに移動できますか。',
		desc_ko: '저쪽 자리로 옮기고 싶어요.',
		phonetic: 'jeojjok jari ro omgigo sipeoyo',
		file_name: 'tts4',
	},
	{
		id: 5,
		language_ko: '조금 이따가 주문할게요.',
		language_en: 'Give us a little more time.',
		language_zh_cn: '给我们一点时间。',
		language_zh_tw: '給我們一點時間。',
		language_jp: 'Give us a little more time。',
		desc_ko: '조금 이따가 주문할게요.',
		phonetic: 'jo guem itdaga joomoon halgaeyo',
		file_name: 'tts5',
	},
	{
		id: 6,
		language_ko: '주문해도 될까요?',
		language_en: 'Can I order?',
		language_zh_cn: '我可以订购吗？',
		language_zh_tw: '我可以訂購嗎？',
		language_jp: '注文できますか？',
		desc_ko: '주문해도 될까요?',
		phonetic: 'joomoon haedo deolggayo',
		file_name: 'tts6',
	},
	{
		id: 7,
		language_ko: '이거 주세요.',
		language_en: "I'll choose this one.",
		language_zh_cn: '我会选择这个。',
		language_zh_tw: '我會選擇這個。',
		language_jp: '私はこれを選びます。',
		desc_ko: '이거 주세요',
		phonetic: 'ie geo ju se yo',
		file_name: 'tts7',
	},
	{
		id: 8,
		language_ko: '얼마에요?',
		language_en: 'How much is it?',
		language_zh_cn: '多少钱？',
		language_zh_tw: '多少錢？',
		language_jp: 'いくらですか？',
		desc_ko: '얼마에요?',
		phonetic: 'ulma yeoyo',
		file_name: 'tts8',
	},
	{
		id: 9,
		language_ko: '감사합니다.',
		language_en: 'Thank you.',
		language_zh_cn: '谢谢.',
		language_zh_tw: '謝謝.',
		language_jp: 'ありがとうございました.',
		desc_ko: '감사합니다.',
		phonetic: 'gamsa habnida',
		file_name: 'tts9',
	},
	{
		id: 10,
		language_ko: '맛있어요.',
		language_en: "it's delicious.",
		language_zh_cn: '这很美味。',
		language_zh_tw: '這很美味。',
		language_jp: 'それはおいしいです。',
		desc_ko: '맛있어요',
		phonetic: 'mat it eoyo',
		file_name: 'tts10',
	},
];

class TTSList extends React.Component {
	state = {
		data: [],
	};

	constructor(props) {
		super(props);
		console.log('[LIFE CYCLE] TTSList constructor');

		// const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		// this.state = {
		// 	dataSource: ds.cloneWithRows(['row 1', 'row 2']),
		// };
		Sound.setCategory('Playback');
	}

	async componentDidMount() {
		console.log('[LIFE CYCLE] TTSList componentDidMount');

		let _data = await this._getTTSData();
		console.log('_data : ' + _data);
		this.setState({ data: _data });
	}

	_getTTSData() {
		console.log('call _getTTSData');

		// console.log(data);
		let data = dataTTS;
		console.log('_getTotalStores count : ' + data.length);

		let _language, _desc;
		switch (this.props.profileStore.language) {
			case 'ko':
				_language = 'language_ko';
				_desc = 'desc_ko';
				break;
			case 'en':
				_language = 'language_en';
				_desc = 'desc_en';
				break;
			case 'zh_cn':
				_language = 'language_zh_cn';
				_desc = 'desc_zh_cn';
				break;
			case 'zh_tw':
				_language = 'language_zh_tw';
				_desc = 'desc_zh_tw';
				break;
			case 'jp':
				_language = 'language_jp';
				_desc = 'desc_jp';
				break;
		}

		let count = data.length;
		let arr = [];
		for (let i = 0; i < count; i++) {
			arr.push({
				key: data[i].id,
				language: data[i][_language],
				description: data[i][_desc],
				phonetic: data[i].phonetic,
				file_name: data[i].file_name,
			});
		}
		console.log('TTS List');
		// console.log(arr);
		return arr;
	}

	_onSpeak = index => {
		console.log('_onSpeak : index(' + index + ')');

		var speakFileName = this.state.data[index].file_name + '.wav';
		console.log('file_name : ' + speakFileName);

		var whoosh = new Sound(speakFileName, Sound.MAIN_BUNDLE, error => {
			if (error) {
				console.log('failed to load the sound', error);
				return;
			}
			// loaded successfully
			console.log(
				'duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels()
			);

			// Play the sound with an onEnd callback
			whoosh.play(success => {
				if (success) {
					console.log('successfully finished playing');
				} else {
					console.log('playback failed due to audio decoding errors');
				}
			});
		});
		console.log('volume: ' + whoosh.getVolume());
		console.log('pan: ' + whoosh.getPan());
		console.log('loops: ' + whoosh.getNumberOfLoops());
	};

	// render() {
	//     return (
	//         <ListView
	//             style={styles.container}
	//             dataSource={this.state.dataSource}
	//             renderRow={(data) => <View><Text>{data}</Text></View>}
	//         />
	//     );
	// }

	render() {
		// console.log('!!! TTSList call render !!!');

		return (
			<View>
				<View style={{ flexDirection: 'row' }}>
					<View style={[styles.ContentHeaderSection, { flex: 8 }]}>
						<Text style={styles.ContentHeader}>Traveler Language</Text>
					</View>
					<View style={[styles.ContentHeaderSection, { flex: 10 }]}>
						<Text style={styles.ContentHeader}>
							Travel Nation Language
							{'\r\n'}[phonetic alphabet]
						</Text>
					</View>
					<View style={styles.ContentHeaderIconSection}>{/* <Text>Speak</Text> */}</View>
				</View>
				<Divider style={styles.drawerDivider} />
				<FlatList
					data={this.state.data}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item, index }) => {
						// console.log('renderItem');
						// console.log(item);

						return (
							<View key={item.key} width={'100%'} height={55}>
								<View style={[styles.ContentPart]}>
									<View style={[styles.ContentTextSection, { flex: 8 }]}>
										<Text style={styles.ContentText} ellipsizeMode="tail">
											{item.language}
										</Text>
									</View>
									<View style={[styles.ContentTextSection, { flex: 10 }]}>
										<Text style={styles.ContentText} ellipsizeMode="tail">
											{item.description}
											{'\r\n'}[{item.phonetic}]
										</Text>
									</View>
									<View style={styles.ContentIconSection}>
										<TouchableHighlight
											onPress={this._onClick}
											onPress={() => this._onSpeak(index)}
										>
											<Image
												style={styles.ContentIcon}
												source={require('../assets/icons/contents/arrow_play.png')}
											/>
										</TouchableHighlight>
										{/* <Image
											style={styles.ContentIcon}
											source={require('../assets/icons/share.png')}
										/> */}
									</View>
								</View>
							</View>
						);
					}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
	},
	drawerDivider: {
		// marginLeft: 10,
		// marginRight: 10,
		height: 1,
		backgroundColor: 'gray',
	},
	ContentPart: {
		flex: 1,
		flexDirection: 'row',
		// justifyContent: 'space-between',
		// justifyContent: 'center',
		// margin: 5,
		fontSize: 12,
		marginBottom: 5,
		// backgroundColor: 'white',
		fontFamily: 'NanumSquare_acL',
		// backgroundColor: '#1d8',
	},
	ContentHeaderSection: {
		flex: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	ContentHeader: {
		fontFamily: 'NanumSquare_acB',
		fontSize: 14,
		textAlign: 'center',
	},
	ContentHeaderIconSection: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	ContentTextSection: {
		flex: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	ContentText: {
		// width: 150,
		marginRight: 5,
		textAlign: 'center',
		fontFamily: 'NanumSquare_acL',
		fontSize: 12,
		// backgroundColor: '#8d8',
	},
	ContentIconSection: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	ContentIcon: {
		width: 20,
		height: 20,
		// flex: 2,
		// backgroundColor: '#d81',
	},
});

export default inject('profileStore')(observer(TTSList));
