import React from 'react';
import { Text } from 'react-native';
import colors from '../config/colors';

const ErrorMessage = ({ children }) =>  <Text style={{ color: colors.DANGER }}>{ children }</Text>

export default ErrorMessage;