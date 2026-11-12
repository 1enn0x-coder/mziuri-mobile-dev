import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  form: {
    backgroundColor: "#fff",
    padding: 18,
    marginBottom: 16,
    borderRadius: 10,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 7,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  descriptionInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  error: {
    color: "#dc2626",
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: "#2563eb",
    padding: 13,
    borderRadius: 7,
    alignItems: "center",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    marginBottom: 12,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 15,
    color: "#4b5563",
    marginBottom: 14,
  },
  cardButton: {
    alignSelf: "flex-start",
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  emptyMessage: {
    color: "#6b7280",
    textAlign: "center",
    marginTop: 8,
  },
});
