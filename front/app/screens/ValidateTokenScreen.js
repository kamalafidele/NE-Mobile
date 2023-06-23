import React, { useContext, useState } from "react";
import Screen from "./Screen";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";

import AppLogo from "../components/AppLogo";
import AppInputText from "../components/AppInputText";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import Separator from "../components/Separator";
import tokensApi from "../api/tokensApi";
import ErrorMessage from "../components/ErrorMessage";

const validationSchema = Yup.object().shape({
  token: Yup.string().required().min(8).max(8).label("Electricity Token"),
});

function ValidateTokenScreen({ navigation }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(null);


  const handleTokenValidation = async ({ token }) => {
    setDays(null);
    setLoading(true);
    
    const result = await tokensApi.validateToken(token);
    setLoading(false);

    if (!result.ok) return setError(result.data.error);
    setDays(result.data.days);
    
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

        <Text style={styles.span}>Electricity Token Validator</Text>
        <Formik
          initialValues={{ token: "" }}
          onSubmit={(values) => handleTokenValidation(values)}
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
                placeholder="Your Electricity Token"
                onBlur={() => setFieldTouched("token")}
                onChangeText={handleChange("token")}
              />
              { touched.token && <ErrorMessage>{ errors.token }</ErrorMessage> }
              
              { loading ? <ActivityIndicator color={ colors.PRIMARY } size={'large'}/> : <AppButton title={"Validate Token"} onPress={handleSubmit} />}
            </View>
          )}
        </Formik>
        <View>
          <Text>{ days > 0 && `Days of Lighting: `}</Text>
          <Text style={{ color: colors.GREEN, fontSize: 28 }}>{ days > 0 && ` ${days}`}</Text>
        </View>
        <Separator />

        <View>
          <AppButton
            title={"Buy Electricity"}
            onPress={() => navigation.navigate("buy_electricity")}
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

export default ValidateTokenScreen;
