import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-neutral-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center text-6xl">
          <CardTitle className="font-extrabold">Error 404</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-2xl">
          <p>La direccion ingresada no existe</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Error;
