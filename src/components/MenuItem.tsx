import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5"
type Props = {
    iconName: string;
    isCurrent?: boolean;
};
export const BottomMenuItem = ({ iconName, isCurrent }: Props) => {
    return (
        <View
            style={{
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Icon
                name={iconName}
                size={32}
                style={{ color: isCurrent ? "#7884BF" : "grey" }}
            />
        </View>
    );
};