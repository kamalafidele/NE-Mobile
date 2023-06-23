import React, { useState } from "react";
import Screen from "./Screen";
import { StyleSheet, View, Text, ActivityIndicator, ScrollView } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";

import AppLogo from "../components/AppLogo";
import AppInputText from "../components/AppInputText";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import Separator from "../components/Separator";
import tokensApi from "../api/tokensApi";
import ErrorMessage from "../components/ErrorMessage";
import ListItem from "../components/ListItem";

const validationSchema = Yup.object().shape({
  meterNumber: Yup.string().required().min(6).max(6).label("Meter Number"),
});

function TokenListScreen({ navigation }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState([]);


  const handleTokenFetch = async ({ meterNumber }) => {
    setLoading(true);
    
    const result = await tokensApi.fetchTokens(meterNumber);
    setLoading(false);

    if (!result.ok) return setError(result.data.error || 'Unexpected error occurred!');
    setTokens(result.data.purchasedTokens);
    
  };

  return (
    <Screen color={colors.PRIMARY}>
      <ScrollView style={styles.container}>
        <View style={styles.logoContainer}>
          <AppLogo font_size={32} />
          <Text
            style={{ fontSize: 20, color: colors.BLACK, fontWeight: "bold" }}
          >
            Welcome ....
          </Text>
        </View>

        <Text style={styles.span}>My Tokens</Text>
        <Formik
          initialValues={{ meterNumber: "" }}
          onSubmit={(values) => handleTokenFetch(values)}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleSubmit,
            setFieldTouched,
            touched,
            errors,
          }) => (
            <View style={styles.formContainer}>
              { error && <ErrorMessage>{ error }</ErrorMessage> }
              <AppInputText
                iconName={"numeric-0-box"}
                iconColor={colors.GRAY}
                placeholder="Your Meter Number"
                onBlur={() => setFieldTouched("meterNumber")}
                onChangeText={handleChange("meterNumber")}
              />
              { touched.meterNumber && <ErrorMessage>{ errors.meterNumber }</ErrorMessage> }
              
              { loading ? <ActivityIndicator color={ colors.PRIMARY } size={'large'}/> : <AppButton title={"List tokens"} onPress={handleSubmit} />}
            </View>
          )}
        </Formik>
        <View>
            { tokens.map((token) => (
                <ListItem key={token._id} title={'Token: ' + token.token} subtitle={'Days: ' + token.token_value_days}/>
            ))}
        </View>
        <Separator />

        <View>
          <AppButton
            title={"Buy Electricity"}
            onPress={() => navigation.navigate("buy_electricity")}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.WHITE,
    height: "100%",
    marginTop: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  formContainer: {},
  span: {
    textAlign: "center",
    color: colors.GRAY,
  },
});

export default TokenListScreen;
