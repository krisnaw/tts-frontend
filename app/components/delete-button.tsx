import {Form, useNavigation} from "react-router";
import {Button} from "~/components/ui/button";
import {Loader2, TrashIcon} from "lucide-react";
import type {RecordType} from "~/lib/types";

export function DeleteButton({record} : {record : RecordType}) {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting" && navigation.formAction === `/record/${record.id}/delete`;
  return (
      <Form action={`/record/${record.id}/delete`} method="DELETE">
        <Button type="submit" variant="ghost" size="icon" className="text-muted-foreground" disabled={isSubmitting}>

          {isSubmitting ?  <Loader2 className="animate-spin" /> : <TrashIcon />}
        </Button>
      </Form>
  )
}