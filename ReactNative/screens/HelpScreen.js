import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	Button,
	TouchableHighlight,
	Picker,
	TextInput,
	KeyboardAvoidingView,
} from 'react-native';

import { Table, Row, Rows } from 'react-native-table-component';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { decorate, observable, observe, action, when, computed, autorun, runInAction } from 'mobx';
import { observer, inject } from 'mobx-react';

import Language from '../constants/Language';

class HelpScreen extends React.Component {
	static navigationOptions = {
		title: 'Help',
	};

	constructor(props) {
		super(props);
		this.state = {
			status: 'Conversation',
			place: '',
			myCountry: '',
			myPrice: '',
			travelCountry: '',
			travelPrice: '',
			tableHead: ['여행자 언어', '여행지 언어\n[발음기호(영어)]', 'TTS'],
			tableData: [
				['점원 부를때', '여기요~', '☞'],
				['음식 주문할 때', '이거 주세요~', '☞'],
				['계산할 때', '얼마에요?', '☞'],
				['감사 인사', '감사합니다.', '☞'],
			],
		};
	}

	componentDidMount() {
		console.log('HelpScreen componentDidMount');

		this.setState({ language: this.props.profileStore.language });
		console.log('curLanguage : ' + this.props.profileStore.language);

		autorun(() => {
			console.log('autorun');
			console.log('this.state.language : ' + this.state.language);
			console.log('this.props.profileStore.language : ' + this.props.profileStore.language);
			if (this.state.language == this.props.profileStore.language) {
				console.log('this.state.language == this.props.profileStore.language');
			} else {
				console.log('this.state.language != this.props.profileStore.language');

				// this._getTotalFoods().then(
				// 	_data => {
				// 		this.setState({ data: _data });
				// 		console.log('_data : ' + _data);
				// 		console.log('after setState({ data: _data })');
				// 		console.log('this.props.profileStore.language : ' + this.props.profileStore.language);
				// 	},
				// 	error => {
				// 		console.log('after then error : ');
				// 		console.log(error);
				// 	}
				// );
				console.log('this.state.language : ' + this.state.language);
				this.setState({ language: this.props.profileStore.language });
			}
		});
	}

	componentWillUpdate(nextProps) {
		console.log('HelpScreen componentWillUpdate');
	}

	_onPressConversation = () => {
		console.log('call _onPressConversation');
		// this.state.status = str;
		this.setState({ status: 'Conversation' });
	};

	_onPressExchangeRate = () => {
		console.log('call _onPressExchangeRate');
		this.setState({ status: 'ExchangeRate' });
	};

	render() {
		const state = this.state;

		console.log('current status : ' + state.status);

		return (
			<KeyboardAwareScrollView
				behavior="padding"
				style={styles.Container}
				resetScrollToCoords={{ x: 0, y: 0 }}
				scrollEnabled={false}
			>
				<View style={styles.ButtonContainer}>
					<TouchableHighlight style={styles.Button} underlayColor="#ada" onPress={this._onPressConversation}>
						<View>
							<Text style={styles.ButtonText}>
								{Language.Conversation[this.props.profileStore.language]}
							</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight style={styles.Button} underlayColor="#ada" onPress={this._onPressExchangeRate}>
						<View>
							<Text style={styles.ButtonText}>
								{Language.ExchangeRate[this.props.profileStore.language]}
							</Text>
						</View>
					</TouchableHighlight>
				</View>

				<View style={styles.ContentsLayout}>
					{this.state.status == 'Conversation' && (
						<View style={styles.ConversationLayout}>
							<View style={styles.ConversationHeader}>
								<Text style={styles.ConversationHeaderText}>※ 장소</Text>

								<View style={styles.PickerContainer}>
									<Picker
										selectedValue={this.state.place}
										style={styles.Picker}
										onValueChange={(itemValue, itemIndex) => this.setState({ place: itemValue })}
									>
										<Picker.Item
											label={Language.Restaurant[this.props.profileStore.language]}
											value="restaurant"
										/>
										<Picker.Item
											label={Language.Taxi[this.props.profileStore.language]}
											value="taxi"
										/>
										<Picker.Item
											label={Language.Airport[this.props.profileStore.language]}
											value="airport"
										/>
										<Picker.Item
											label={Language.Street[this.props.profileStore.language]}
											value="street"
										/>
									</Picker>
								</View>
							</View>

							<View style={[styles.ConversationHeader, { marginTop: 10 }]}>
								<Text style={styles.ConversationHeaderText}>※ TTS (Text to Speech)</Text>

								<View style={styles.TableContainer}>
									<Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
										<Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
										<Rows data={state.tableData} textStyle={styles.text} />
									</Table>
								</View>
							</View>
						</View>
					)}
					{/* end of <View style={styles.ConversationLayout}>  */}

					{this.state.status == 'ExchangeRate' && (
						<View style={styles.ExchangeRateLayout}>
							<View style={styles.ConversationHeader}>
								<Text style={styles.ConversationHeaderText}>※ 나의 국가</Text>

								<View style={[styles.PickerContainerExchange, , { marginTop: 4 }]}>
									<Picker
										selectedValue={this.state.myCountry}
										style={styles.PickerExchange}
										onValueChange={(itemValue, itemIndex) =>
											this.setState({ myCountry: itemValue })
										}
									>
										<Picker.Item label="대한민국" value="ko" />
										<Picker.Item label="미국" value="us" />
										<Picker.Item label="중국" value="zh" />
										<Picker.Item label="일본" value="jp" />
									</Picker>
								</View>
								<View style={styles.PickerContainerExchange}>
									<TextInput
										style={styles.ExchangeRatePrice}
										onChangeText={text => this.setState({ myPrice: text })}
										value={this.state.myPrice}
										placeholder="금액 입력"
									/>
								</View>
							</View>

							<View style={[styles.ConversationHeader, { marginTop: 10 }]}>
								<Text style={styles.ConversationHeaderText}>※ 여행 국가</Text>

								<View style={[styles.PickerContainerExchange, , { marginTop: 4 }]}>
									<Picker
										selectedValue={this.state.travelCountry}
										style={styles.PickerExchange}
										onValueChange={(itemValue, itemIndex) =>
											this.setState({ travelCountry: itemValue })
										}
									>
										<Picker.Item label="미국" value="us" />
										<Picker.Item label="중국" value="zh" />
										<Picker.Item label="일본" value="jp" />
										<Picker.Item label="대한민국" value="ko" />
									</Picker>
								</View>
								<View style={styles.PickerContainerExchange}>
									<TextInput
										style={styles.ExchangeRatePrice}
										onChangeText={text => this.setState({ travelPrice: text })}
										value={this.state.travelPrice}
										placeholder="금액 입력"
									/>
								</View>
							</View>
						</View>
					)}
					{/* end of <View style={styles.ExchangeRateLayout}>  */}
				</View>
			</KeyboardAwareScrollView>
		);
	}
}

const styles = StyleSheet.create({
	TableContainer: {
		// flex: 1,
		// padding: 6,
		paddingTop: 6,
		// backgroundColor: '#ff1'
	},
	head: {
		// width:70,
		height: 40,
		backgroundColor: '#f1f8ff',
	},
	text: {
		// margin: 6,
		// justifyContent:'space-around',
		// alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: '#f1f8ff',
	},

	Container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'white',
		// backgroundColor:'#a1a',
	},
	ButtonContainer: {
		// flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingTop: 5,
		marginTop: 10,
		// paddingBottom: 5,
		// backgroundColor:'#a1a',
	},
	Button: {
		width: 100,
		height: 50,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#42A5F5',
	},
	ButtonText: {
		color: '#FFF',
		fontFamily: 'netmarbleM',
		fontSize: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	PickerContainer: {
		width: 200,
		height: 50,
		marginTop: 4,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: '#ECEFF1',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#E3F2FD',
	},
	Picker: {
		width: 180,
		height: 40,
		borderColor: '#c8e1ff',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#E3F2FD',
	},
	PickerContainerExchange: {
		width: '100%',
		height: 50,
		marginTop: -2,
		borderWidth: 2,
		// borderRadius: 10,
		borderColor: '#CFD8DC',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#E3F2FD',
	},
	PickerExchange: {
		width: '100%',
		height: 40,
		marginLeft: 10,
		borderColor: '#c8e1ff',
		// justifyContent:'center',
		// alignItems: 'center',
		// backgroundColor: "#ffF2FD",
	},
	ContentsLayout: {
		flex: 1,
		flexDirection: 'column',
		// justifyContent:'space-between',
		// alignItems: 'center',
		// alignSelf: 'stretch',
		margin: 10,
		// paddingTop: 5,
		// backgroundColor:'#aa1',
	},
	ConversationLayout: {
		flex: 1,
		width: '100%',
		// borderWidth: 1,
		// borderColor: '#ffc8aa',
		flexDirection: 'column',
		alignSelf: 'center',
		padding: 10,
		// backgroundColor:'#773',
	},
	ConversationHeader: {
		flexDirection: 'column',
		// justifyContent:'space-between',
		// alignItems: 'center',
		// backgroundColor:'#1a3',
	},
	ConversationHeaderText: {
		// flex: 8,
		fontSize: 20,
		alignItems: 'center',
		// fontFamily: 'netmarbleM'
	},

	ExchangeRateLayout: {
		flex: 1,
		width: '100%',
		// borderWidth: 1,
		// borderColor: '#ffc8aa',
		flexDirection: 'column',
		alignSelf: 'center',
		padding: 10,
		// backgroundColor:'#773',
	},
	ExchangeRatePrice: {
		height: 40,
		alignSelf: 'flex-end',
		textAlign: 'right',
		marginRight: 10,
		// borderColor: 'gray',
		// borderWidth: 1,
	},
});

export default inject('profileStore', 'routerStore')(observer(HelpScreen));
