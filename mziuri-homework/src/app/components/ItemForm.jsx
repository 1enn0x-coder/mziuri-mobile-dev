import { Formik } from "formik";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/items";

function validate(values) {
  const errors = {};

  if (!values.title.trim()) {
    errors.title = "name is required";
  }

  if (!values.description.trim()) {
    errors.description = "description is required";
  }

  return errors;
}

export default function ItemForm({ onAddItem }) {
  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>add new card</Text>

      <Formik
        initialValues={{ title: "", description: "" }}
        validate={validate}
        onSubmit={(values, { resetForm }) => {
          onAddItem({
            title: values.title.trim(),
            description: values.description.trim(),
          });

          resetForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="name"
              value={values.title}
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              maxLength={60}
            />
            {touched.title && errors.title ? (
              <Text style={styles.error}>{errors.title}</Text>
            ) : null}

            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="description"
              value={values.description}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              multiline
              maxLength={250}
            />
            {touched.description && errors.description ? (
              <Text style={styles.error}>{errors.description}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>add</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}
