import React from "react";

export const CustomForm = ({
  original,
}: {
  original: { firstName: string };
}) => (
  <form>
    <input type="text" name="firstName" value={original.firstName} />
  </form>
);
