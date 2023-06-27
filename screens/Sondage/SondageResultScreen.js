import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ImageBackground, Dimensions, View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { PieChart } from 'react-native-svg-charts';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { retrieveToken } from '../../service/TokenManager';

import colors from '../../config/colors';
import fonts from '../../config/fonts';
import images from '../../config/images.js';
import api from '../../config/api';

import Header from '../../components/Header.js';

const width = Dimensions.get('window').width;

function SondageResultScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, nom, nbQuestion,  questions, aRepondu } = route.params;
  const [repData, setRepData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let successfulRequests = 0;

    retrieveToken('userToken').then((token) => {
        questions.forEach((question) => {
        fetch(api.api_link+'/api/data/top-ten-reponses/' + question.id, {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setRepData(prevState => ({ ...prevState, [question.id]: data }));
            successfulRequests++;

            const totalRequests = questions.length;
            if (successfulRequests === totalRequests) {
            setLoading(false);
            }
        })
        .catch(error => console.error(error));
        });
    });

  }, [questions, aRepondu]);

  function renderCharts() {
    return (
      Object.keys(repData).map((key, index) => {
        const data = Object.values(repData[key]);
        const chartData = data.map((value, index) => ({
          value,
          svg: { fill: getRandomColor(index) },
          key: index.toString(),
        }));
        
        return (
          <View style={styles.chartContainer} key={index}>
            <Text style={styles.title_chart}>{questions[index].contenu}</Text>
            <View style={styles.chart}>
                <PieChart style={{ height: 150, width: 150 }} data={chartData}/>
                <ScrollView style={styles.labelsContainer}>
                {data.map((value, labelIndex) => (
                    <View key={labelIndex} style={styles.label}>
                    <View style={[styles.labelColor, { backgroundColor: getRandomColor(labelIndex) }]} /> 
                    <Text style={[styles.labelText, styles.labelText2]}>{Object.keys(repData[key])[labelIndex]}</Text>
                    <View style={styles.labelTextContainer}>
                        <Text style={styles.labelText}>{value}</Text>
                        <MaterialCommunityIcons name="account" size={16} color={colors.secondary} />
                    </View>
                    </View>
                ))}
                </ScrollView>
            </View>
          </View>
        );
      })
    );
  }
  
  
  function getRandomColor(index) {
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
  return colors[index % colors.length];
}


  return (
    <ImageBackground source={images.authentication.background} resizeMode="cover" style={styles.imageContainer}>
      <SafeAreaView style={styles.container}>
        <Header title={nom} style={styles.header} navigation={navigation} />
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.postContainer}>
            <Text style={styles.title}>{nbQuestion} Questions </Text>

            {loading ? (
                <ActivityIndicator size="large" color={colors.secondary} />
            ) : (
              renderCharts()
            )}
          </View>

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  chartContainer: {
    width: '100%',
    height : 250,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 20,
    backgroundColor: colors.tertiary,
    borderRadius: 15,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOffset: {
        width: 5,
        height: 5,
    shadowOpacity: 0.8,
    shadowRadius: 4,
    },
  },
  title_chart: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondary,
    fontFamily: fonts.main,
  },    
  chart: {
    width: '100%',
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    },
  scrollView: {
    width: width,
    flex: 1,
  },
  postContainer: {
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  title: {
    padding: 5,
    margin: 10,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.secondary,
    fontFamily: fonts.main,
  },
  labelsContainer: {
    maxHeight : 150,
    margin: 10,
    backgroundColor: colors.quaternary,
    borderRadius: 15,
    padding: 10,
    },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  labelColor: {
    width: 10,
    height: 10,
  },
    labelTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    },
  labelText: {
    padding : 5,
    overflow : 'hidden',
    fontSize: 12,
    color: colors.secondary,
    fontFamily: fonts.main,
    textAlign: 'left',
  },
  labelValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
    fontFamily: fonts.main,
    textAlign: 'right',
    },
    labelText2: {
      maxWidth : 70,
      overflow : 'hidden',
    }
  
});

export default SondageResultScreen;
