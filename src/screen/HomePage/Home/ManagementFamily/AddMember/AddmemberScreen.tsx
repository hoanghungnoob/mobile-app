import React from 'react';
import {KeyboardAvoidingView,Platform,TouchableWithoutFeedback,Keyboard,View,FlatList} from 'react-native';
import addmember from '../../../../../styles/HomePage/Home/ManagementFamily/AddMember/AddMemberScreen';
import renderViewGoBack from './RenderViewGoBack';
import renderViewFormCreate from './RenderViewFormCreate';
import renderModalCreate from './RenderModelCreate';
const AddMemberScreen = () => {
  const headerComponent = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={addmember.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={addmember.inner}>
            <View>
              {renderViewFormCreate()}
              {renderModalCreate()}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  };
  return (
    <View style={addmember.container}>
      {renderViewGoBack()}
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={headerComponent}
        data={[]}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        renderItem={({item}) => (
          <View>
            <></>
          </View>
        )}
      />
    </View>
  );
};
export default AddMemberScreen;
