import React from 'react';
import { TouchableOpacity, Text, TextInput, View, Image, KeyboardAvoidingView,  ScrollView,TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../../../../../../styles/HomePage/HealthCheckScheduling/Treatment Remind SchedulingWithManagement/InputInformationManually/AddTreatmentReminder/CreateTreatmentRemind';
import useCreateTreatment from '../../../../../../hook/HomePage/TreatmentRemindScheduling/Treatment Remind SchedulingWithManagement/InputInformationManualy/useCreateTreatment';
type TimePeriod = 'morning' | 'noon' | 'evening';
const CreateTreatmentRemindScreen = () => {
  const  {startDate,setStartDate,endDate, setEndDate, frequency, setFrequency, treatmentTime, setTreatmentTime, selectedTime,medications,open,setOpen,error,handlePress,useGoBack,handleSave,handleNumMedicationsChange,handleMedicationNameChange,handleDosageChange} = useCreateTreatment();
  const renderMedicationForms = (timePeriod: TimePeriod) => {
    return medications[timePeriod].map((medication, index) => (
      <View key={index}>
        <Text style={styles.textLabel}>Medication {index + 1}:</Text>
        <View style={styles.viewRenderItem}>
          <TextInput
            placeholderTextColor="#9CA3AF"
            placeholder="Medicine Name"
            style={styles.viewInput}
            value={medication.medicationName}
            onChangeText={(text) => handleMedicationNameChange(timePeriod, text, index)}
          />
          <TextInput
            placeholderTextColor="#9CA3AF"
            placeholder="Dosage"
            style={styles.viewInput}
            value={medication.dosage.toString()}
            onChangeText={(text) => handleDosageChange(timePeriod, text, index)}
          />
        </View>
      </View>
    ));
  };
  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView behavior={ 'padding' }>
        <TouchableWithoutFeedback>
          <TouchableOpacity activeOpacity={1} style={styles.inner}>
            <View style={styles.viewForm}>
              <View style={styles.viewGoBack}>
                <TouchableOpacity onPress={useGoBack}>
                  <Image source={require('../../../../../../image/back-icon.png')} />
                </TouchableOpacity>
                <Text style={styles.textFill}>Add-Your-Medicines</Text>
              </View>
              <View>
                <Text style={styles.textLabel}>Start day</Text>
                <TouchableOpacity style={styles.dateInput} onPress={() => setOpen(true)}>
                  <Text>{startDate ? startDate.toDateString() : 'Start day'}</Text>
                </TouchableOpacity>
                {open && <DateTimePicker mode="date" value={startDate || new Date()} onChange={(event, date) => { setOpen(false); setStartDate(date); }} />}
              </View>
              <View>
                <Text style={styles.textLabel}>End Day</Text>
                <TouchableOpacity style={styles.dateInput} onPress={() => setOpen(true)}>
                  <Text>{endDate ? endDate.toDateString() : 'End Day'}</Text>
                </TouchableOpacity>
                {open && <DateTimePicker mode="date" value={endDate || new Date()} onChange={(event, date) => { setOpen(false); setEndDate(date); }} />}
              </View>
              <View>
                <Text style={styles.textLabel}>Number of times per day</Text>
                <TextInput
                  placeholderTextColor="#9CA3AF"
                  placeholder="Enter the number of times"
                  style={styles.viewInput}
                  value={frequency}
                  onChangeText={setFrequency}
                  keyboardType="numeric"
                />
              </View>
               <View>
                <Text style={styles.textLabel}>Choose time</Text>
                <View style={styles.viewTimeOptions}>
                  {['morning', 'noon', 'evening'].map((timePeriod) => (
                    <TouchableOpacity
                      key={timePeriod}
                      style={selectedTime.includes(timePeriod) ? styles.timeOptionChoose : styles.timeOption}
                      onPress={() => handlePress(timePeriod as TimePeriod)}>
                      <Text style={selectedTime.includes(timePeriod) ? styles.timeOptionTextChoose : styles.timeOptionText}>{timePeriod}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.viewRenderItem}>
              {['Morning', 'Noon', 'Evening'].map((timePeriodStr) => {
                const timePeriod = timePeriodStr.toLowerCase() as TimePeriod;
                if (!selectedTime.includes((timePeriod))) {
                  return null;
                }
                return (
                <View key={timePeriodStr}>
                  <Text style={styles.textLabel}>{timePeriod}</Text>
                  <View style={styles.viewRenderEnter}>
                    <Text style={styles.textHour}>Drink time</Text>
                    <TextInput
                      style={styles.viewInput}
                      placeholder="Drink Time"
                      value={treatmentTime[timePeriod]}
                      onChangeText={(value) => setTreatmentTime({ ...treatmentTime, [timePeriod]: value })}
                    />
                  </View>
                  <View style={styles.viewRenderEnter}>
                    <Text style={styles.textHour}>Enter number of medications</Text>
                    <TextInput
                      style={styles.viewInputEnter}
                      onChangeText={(value) => handleNumMedicationsChange(timePeriod, value)}
                      keyboardType="numeric"
                    />
                  </View>
                  {renderMedicationForms(timePeriod)}
                </View>
              );})}
              </View>
            </View>
            {error.length > 0 && (
              // eslint-disable-next-line react-native/no-inline-styles
              <View style={{ paddingLeft: 20 }}>
                {error.map((errorMessage, index) => (
                  <Text key={index}>{errorMessage}</Text>
                ))}
              </View>
            )}
            <View style={styles.viewButton}>
              <TouchableOpacity onPress={handleSave} style={styles.buttonSave}>
                <Text style={styles.textSave}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
export default CreateTreatmentRemindScreen;
