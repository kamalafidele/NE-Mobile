import React, { useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";

import Screen from "./Screen";
import AppLogo from "../components/AppLogo";
import AppInputText from "../components/AppInputText";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import Separator from "../components/Separator";
import tokensApi from "../api/tokensApi";
import ErrorMessage from "../components/ErrorMessage";

const validationSchema = Yup.object().shape({
  meterNumber: Yup.string().required().min(6).max(6).label("Meter Number"),
  amount: Yup.number().required().label("Amount"),
});

function GenerateTokenScreen({ navigation }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);


  const handleTokenGeneration = async ({ meterNumber, amount }) => {

    setLoading(true);
    const result = await tokensApi.generateToken(meterNumber, amount);
    setLoading(false);

    console.log(result.data);

    if (!result.ok) return setError(result.data.status);
    setToken(result.data.purchasedToken.token);
  };

  return (
    <Screen color={colors.PRIMARY}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <AppLogo font_size={32} />
          <Text
            style={{ fontSize: 20, color: colors.BLACK, fontWeight: "bold" }}
          >
            Welcome ....
          </Text>
        </View>

        <Text style={styles.span}>Electricity Token Generator</Text>
        <Formik
          initialValues={{ meterNumber: "", amount: 0 }}
          onSubmit={(values) => handleTokenGeneration(values)}
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
                placeholder="Your meter number"
                onBlur={() => setFieldTouched("meterNumber")}
                onChangeText={handleChange("meterNumber")}
              />
              { touched.meterNumber && <ErrorMessage>{ errors.meterNumber }</ErrorMessage> }
              <AppInputText
                iconName={"currency-usd"}
                iconColor={colors.GRAY}
                placeholder="Amount"
                onBlur={() => setFieldTouched("amount")}
                onChangeText={handleChange("amount")}
              />
              { touched.amount && <ErrorMessage>{ errors.amount }</ErrorMessage> }
              
              { loading ? <ActivityIndicator color={ colors.PRIMARY } size={'large'}/> : <AppButton title={"Buy Electricity"} onPress={handleSubmit} />}
            </View>
          )}
        </Formik>
        <View>
          <Text>{ token && `This is the generated Token:`}</Text>
          <Text style={{ color: colors.GREEN, fontSize: 28 }}>{ token && ` ${token}`}</Text>
        </View>
        <Separator />

        <View>
          <AppButton
            title={"Validate Token"}
            onPress={() => navigation.navigate("validate_token")}
          />
          <AppButton
            title={"List My Tokens"}
            onPress={() => navigation.navigate("list_tokens")}
          />
        </View>
      </View>
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

export default GenerateTokenScreen;
